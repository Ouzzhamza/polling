export interface Poll {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  totalVotes: number;
  HasBeenVoted: boolean; 
  options: PollOption[];
  creatorName?: string;
}


export interface PollOption {
  id: string;
  pollId: string;
  name: string;
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
  pollId: string;
  optionId: string;
  voterName?: string;
  votedAt: Date;
  isAnonymous: boolean;
}