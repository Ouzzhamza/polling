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

export const CREATE_POLL_MUTATION = gql`
  mutation CreatePoll(
    $title: String!
    $description: String
    $options: [String!]!
    $isAnonymous: Boolean!
  ) {
    createPoll(
      title: $title
      description: $description
      options: $options
      isAnonymous: $isAnonymous
    ) {
      id
      title
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation Register($email: String!, $username: String!, $password: String!) {
    register(email: $email, username: $username, password: $password) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;