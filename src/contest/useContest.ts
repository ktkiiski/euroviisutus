import Contest from './Contest';
import contests from './contests';

export default function useContest(id: string): Contest {
  const contest = contests.find((c) => c.id === id);
  if (!contest) {
    throw new Error(`Contest ${id} does not exist`);
  }
  return contest;
}
