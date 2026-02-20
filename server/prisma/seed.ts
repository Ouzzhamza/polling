import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const USERS_DATA = [
  { username: "hamza", email: "hamza@example.com" },
  { username: "alice_dev", email: "alice@example.com" },
  { username: "bob_coder", email: "bob@example.com" },
  { username: "sarah_tech", email: "sarah@example.com" },
  { username: "john_dev", email: "john@example.com" },
];

const POLLS_DATA = [
  {
    title: "What is your favorite programming language?",
    description: "Vote for the language you use most in 2026.",
    isAnonymous: false,
    creatorIndex: 0, 
    options: ["TypeScript", "Rust", "Go", "Python", "Java"],
    votes: [
      { optionIndex: 0, voterIndex: 0, isAnonymous: false }, 
      { optionIndex: 0, voterIndex: 1, isAnonymous: false }, 
      { optionIndex: 3, voterIndex: 2, isAnonymous: false }, 
      { optionIndex: 1, voterIndex: 3, isAnonymous: false }, 
    ],
  },
  {
    title: "Which code editor do you prefer?",
    description: "Anonymous poll - your vote is private!",
    isAnonymous: true,
    creatorIndex: null, 
    options: ["VS Code", "IntelliJ IDEA", "Neovim", "Sublime Text"],
    votes: [
      { optionIndex: 0, voterIndex: null, isAnonymous: true },  
      { optionIndex: 0, voterIndex: null, isAnonymous: true },  
      { optionIndex: 2, voterIndex: null, isAnonymous: true },  
      { optionIndex: 0, voterIndex: null, isAnonymous: true },
    ],
  },
  {
    title: "Best JavaScript Framework in 2026?",
    description: "Help us decide which framework to use for our next project!",
    isAnonymous: false,
    creatorIndex: 1, 
    options: ["React", "Vue", "Svelte", "Angular", "Solid"],
    votes: [
      { optionIndex: 0, voterIndex: 0, isAnonymous: false }, 
      { optionIndex: 2, voterIndex: 1, isAnonymous: false }, 
      { optionIndex: 0, voterIndex: 2, isAnonymous: false }, 
      { optionIndex: 2, voterIndex: 3, isAnonymous: false }, 
      { optionIndex: 4, voterIndex: 4, isAnonymous: false }, 
    ],
  },
  {
    title: "Tabs or Spaces?",
    description: "The eternal debate - what do you use for indentation?",
    isAnonymous: false,
    creatorIndex: 2, 
    options: ["Tabs", "Spaces (2)", "Spaces (4)"],
    votes: [
      { optionIndex: 1, voterIndex: 0, isAnonymous: false }, 
      { optionIndex: 1, voterIndex: 1, isAnonymous: false }, 
      { optionIndex: 2, voterIndex: 2, isAnonymous: false }, 
    ],
  },
  {
    title: "Which OS do you use for development?",
    description: "Tell us your development environment",
    isAnonymous: false,
    creatorIndex: 3, 
    options: ["macOS", "Linux", "Windows", "WSL on Windows"],
    votes: [
      { optionIndex: 1, voterIndex: 0, isAnonymous: false }, 
      { optionIndex: 0, voterIndex: 1, isAnonymous: true },   
      { optionIndex: 3, voterIndex: 2, isAnonymous: false }, 
      { optionIndex: 1, voterIndex: 3, isAnonymous: false }, 
    ],
  },
  {
    title: "Best Database for Serverless?",
    description:
      "Which database would you recommend for a serverless application?",
    isAnonymous: false,
    creatorIndex: 0, 
    options: ["PostgreSQL", "MongoDB", "DynamoDB", "Supabase", "PlanetScale"],
    votes: [], 
  },
  {
    title: "Preferred Testing Framework?",
    description: "What do you use to test your code?",
    isAnonymous: false,
    creatorIndex: 4, 
    options: ["Jest", "Vitest", "Mocha", "Playwright", "Cypress"],
    votes: [
      { optionIndex: 1, voterIndex: 0, isAnonymous: false }, 
      { optionIndex: 1, voterIndex: 1, isAnonymous: false }, 
      { optionIndex: 0, voterIndex: 2, isAnonymous: false }, 
    ],
  },
  {
    title: "Remote Work Preference?",
    description: "Anonymous survey about work location preferences",
    isAnonymous: true,
    creatorIndex: null,
    options: ["Fully Remote", "Hybrid", "Office", "Flexible"],
    votes: [
      { optionIndex: 0, voterIndex: null, isAnonymous: true },
      { optionIndex: 0, voterIndex: null, isAnonymous: true },
      { optionIndex: 3, voterIndex: null, isAnonymous: true },
      { optionIndex: 1, voterIndex: null, isAnonymous: true },
      { optionIndex: 0, voterIndex: null, isAnonymous: true },
    ],
  },
];

async function main() {
  console.log("Starting database seed...");

  await prisma.vote.deleteMany();
  await prisma.option.deleteMany();
  await prisma.poll.deleteMany();
  await prisma.user.deleteMany();

  console.log("Cleaned existing data");

  const hashedPassword = await bcrypt.hash("password123", 10);
   const users: User[] = [];

  for (const userData of USERS_DATA) {
    const user = await prisma.user.create({
      data: {
        username: userData.username,
        email: userData.email,
        password: hashedPassword,
      },
    });
    users.push(user);
  }

  console.log(` Created ${users.length} users`);

  let totalVotes = 0;

  for (let i = 0; i < POLLS_DATA.length; i++) {
    const pollData = POLLS_DATA[i];

    const poll = await prisma.poll.create({
      data: {
        title: pollData.title,
        description: pollData.description,
        isAnonymous: pollData.isAnonymous,
        creatorId:
          pollData.creatorIndex !== null
            ? users[pollData.creatorIndex].id
            : null,
        options: {
          create: pollData.options.map((optionText) => ({ text: optionText })),
        },
      },
      include: {
        options: true,
      },
    });

    console.log(`Created poll: "${poll.title}"`);

    for (const voteData of pollData.votes) {
      await prisma.vote.create({
        data: {
          pollId: poll.id,
          optionId: poll.options[voteData.optionIndex].id,
          userId:
            voteData.voterIndex !== null ? users[voteData.voterIndex].id : null,
          isAnonymous: voteData.isAnonymous,
          voterName: voteData.isAnonymous
            ? null
            : voteData.voterIndex !== null
            ? users[voteData.voterIndex].username
            : null,
        },
      });
      totalVotes++;
    }

  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
