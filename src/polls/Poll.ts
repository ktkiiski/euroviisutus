export default interface Poll {
  id: string;
  contestId: string;
  voteOptions: number[];
  revealCount?: null | number;
  hosts: string[];
}
