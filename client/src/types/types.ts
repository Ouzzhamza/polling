export interface Poll {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  totalVotes: number;
  hasVoted: boolean;
  isAnonymous: boolean;
  options: PollOption[];
  votes: Vote[];
  creator?: {
    id: string;
    username: string;
  } | null;
}

export interface PollOption {
  id: string;
  text: string;
  voteCount: number;
}

export interface VoterInfo {
  id: string;
  name?: string;
  votedFor: string;
  votedAt: Date;
  isAnonymous: boolean;
}

export interface PollWithResults extends Poll {
  voters: VoterInfo[];
}

export interface Vote {
  id: string;
  isAnonymous: boolean;
  voterName: string | null;
  createdAt: string;
  option: {
    id: string;
    text: string;
  };
  user?: {
    id: string;
    username: string;
  } | null;
}

export interface VoteFormData {
  optionId: string;
  isAnonymous: boolean;
}

export interface GetPollsData {
  polls: Poll[];
}

export interface GetPollData {
  poll: Poll;
}

export interface CreatePollResponse {
  createPoll: {
    id: string;
    title: string;
  };
}


export interface CreatePollInputs {
  title: string;
  description: string;
  options: { value: string }[];
  isAnonymous: boolean;
}