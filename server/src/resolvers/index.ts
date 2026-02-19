import prisma from "../utils/prisma";
import { hashPassword, comparePasswords, generateToken } from "../utils/auth";

interface Context {
  userId?: string;
}

export const resolvers = {
  Query: {
    polls: async () => {
      return prisma.poll.findMany({
        include: {
          options: true,
          creator: true,
          votes: {
            include: {
              option: true,
              user: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    },

    poll: async (_: any, { id }: { id: string }) => {
      return prisma.poll.findUnique({
        where: { id },
        include: {
          options: true,
          creator: true,
          votes: {
            include: {
              option: true,
              user: true,
            },
          },
        },
      });
    },

    pollResults: async (_: any, { id }: { id: string }) => {
      const poll = await prisma.poll.findUnique({
        where: { id },
        include: {
          options: {
            include: {
              votes: true,
            },
          },
          votes: {
            include: {
              option: true,
              user: true,
            },
          },
        },
      });

      if (!poll) throw new Error("Poll not found");

      const options = poll.options.map((option: any) => ({
        id: option.id,
        text: option.text,
        voteCount: option.votes.length,
      }));

      const voters = poll.votes.map((vote: any) => ({
        id: vote.id,
        name: vote.isAnonymous
          ? "Anonymous"
          : vote.voterName || vote.user?.username || "Anonymous",
        votedFor: vote.option.text,
        votedAt: vote.createdAt.toISOString(),
      }));

      return {
        poll,
        options,
        voters,
      };
    },

    me: async (_: any, __: any, context: Context) => {
      if (!context.userId) return null;

      return prisma.user.findUnique({
        where: { id: context.userId },
      });
    },
  },

  Mutation: {
    register: async (_: any, { email, username, password }: any) => {
      const hashedPassword = await hashPassword(password);

      const user = await prisma.user.create({
        data: {
          email,
          username,
          password: hashedPassword,
        },
      });

      const token = generateToken(user.id);

      return {
        token,
        user,
      };
    },

    login: async (_: any, { email, password }: any) => {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user || !user.password) {
        throw new Error("Invalid credentials");
      }

      const valid = await comparePasswords(password, user.password);

      if (!valid) {
        throw new Error("Invalid credentials");
      }

      const token = generateToken(user.id);

      return {
        token,
        user,
      };
    },

    createPoll: async (
      _: any,
      { title, description, options, isAnonymous }: any,
      context: Context
    ) => {
      return prisma.poll.create({
        data: {
          title,
          description,
          isAnonymous: isAnonymous || false,
          creatorId: isAnonymous ? null : context.userId,
          options: {
            create: options.map((text: string) => ({ text })),
          },
        },
        include: {
          options: true,
          creator: true,
          votes: {
            include: {
              option: true,
              user: true,
            },
          },
        },
      });
    },

    vote: async (
      _: any,
      { pollId, optionId, isAnonymous, voterName }: any,
      context: Context
    ) => {
      if (context.userId) {
        const existingVote = await prisma.vote.findUnique({
          where: {
            pollId_userId: {
              pollId,
              userId: context.userId,
            },
          },
        });

        if (existingVote) {
          throw new Error("You have already voted on this poll");
        }
      }

      return prisma.vote.create({
        data: {
          pollId,
          optionId,
          userId: isAnonymous ? null : context.userId,
          isAnonymous,
          voterName: isAnonymous ? null : voterName,
        },
        include: {
          poll: true,
          option: true,
          user: true,
        },
      });
    },
  },

  Poll: {
    totalVotes: async (parent: any) => {
      return prisma.vote.count({
        where: { pollId: parent.id },
      });
    },

    hasVoted: async (parent: any, _: any, context: Context) => {
      if (!context.userId) return false;

      const vote = await prisma.vote.findUnique({
        where: {
          pollId_userId: {
            pollId: parent.id,
            userId: context.userId,
          },
        },
      });

      return !!vote;
    },
  },

  Option: {
    voteCount: async (parent: any) => {
      return prisma.vote.count({
        where: { optionId: parent.id },
      });
    },
  },

  Vote: {
    user: async (parent: any) => {
      if (!parent.userId) return null;

      return prisma.user.findUnique({
        where: { id: parent.userId },
      });
    },

    option: async (parent: any) => {
      return prisma.option.findUnique({
        where: { id: parent.optionId },
      });
    },

    poll: async (parent: any) => {
      return prisma.poll.findUnique({
        where: { id: parent.pollId },
      });
    },
  },
};
