export interface DataRes {
  option: string;
  selected: boolean;
  data: VoteOption;
}

export interface VoteOption {
  [key: string]: { name: string, votes: number };
}
