export default interface Poll {
  id: string;
  contestId: string;
  revealCount?: null | number;
  hosts: string[];
}
