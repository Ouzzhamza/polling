export interface Poll {
  id: number;
  title: string;
  description: string;
  options: string[];
  votes: number;
  voted: boolean;
}