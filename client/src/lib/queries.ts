import { gql } from "@apollo/client";

export const GET_POLLS = gql`
  query GetPolls {
    polls {
      id
      title
      description
      totalVotes
      hasVoted
      createdAt
      isAnonymous
      creator {
        id
        username
      }
    }
  }
`;

export const GET_SINGLE_POLL = gql`
  query GetPoll($id: ID!) {
    poll(id: $id) {
      id
      title
      description
      totalVotes
      hasVoted
      options {
        id
        text
        voteCount
      }
      votes {
        id
        isAnonymous
        voterName
        option {
          id
          text
        }
      }
    }
  }
`;


export const VOTE_MUTATION = gql`
  mutation Vote(
    $pollId: ID!
    $optionId: ID!
    $isAnonymous: Boolean!
    $voterName: String
  ) {
    vote(
      pollId: $pollId
      optionId: $optionId
      isAnonymous: $isAnonymous
      voterName: $voterName
    ) {
      id
      isAnonymous
      voterName
      createdAt
      option {
        id
        text
      }
    }
  }
`;