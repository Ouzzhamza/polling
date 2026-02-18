export const typeDefs = `#graphql
  type User {
    id: ID!
    email: String
    username: String
    createdAt: String!
  }

  type Poll {
    id: ID!
    title: String!
    description: String
    isAnonymous: Boolean!
    totalVotes: Int!
    createdAt: String!
    creator: User
    options: [PollOption!]!
    hasVoted: Boolean
  }

  type PollOption {
    id: ID!
    text: String!
    voteCount: Int!
  }

  type Vote {
    id: ID!
    poll: Poll!
    option: PollOption!
    voterName: String
    isAnonymous: Boolean!
    createdAt: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    polls: [Poll!]!
    poll(id: ID!): Poll
    pollResults(id: ID!): PollResults!
    me: User
  }

  type Mutation {
    register(email: String!, username: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    
    createPoll(
      title: String!
      description: String
      options: [String!]!
      isAnonymous: Boolean
    ): Poll!
    
    vote(
      pollId: ID!
      optionId: ID!
      isAnonymous: Boolean
      voterName: String
    ): Vote!
  }

  type PollResults {
    poll: Poll!
    options: [OptionResult!]!
    voters: [Voter!]!
  }

  type OptionResult {
    id: ID!
    text: String!
    voteCount: Int!
  }

  type Voter {
    id: ID!
    name: String!
    votedFor: String!
    votedAt: String!
  }
`;
