import { union } from 'immuton';
import useContest from '../contest/useContest';
import ContestantItem from '../contestants/ContestantItem';
import Sortable from '../utils/Sortable';
import styles from './VoteView.module.css';

interface VoteViewProps {
  contestId: string;
  voteOptions: number[];
  votes: string[];
  onVotesChange: (votes: string[]) => void;
}

export default function VoteView({ contestId, votes, voteOptions, onVotesChange }: VoteViewProps) {
  const contest = useContest(contestId);
  const { contestants } = contest;
  const contestantCodes = contestants.map((contestant) => contestant.code);
  const items = union([votes, contestantCodes]);
  return (
    <>
      <h3>{contest.id}</h3>
      <div className={styles.list}>
        <Sortable
          items={items}
          onSort={(sortedCodes) => {
            onVotesChange(sortedCodes);
          }}
        >
          {(code, index, overlay) => {
            const voteValue: number | undefined = voteOptions[index];
            const contestant = contestants.find((c) => c.code === code)!;
            return <ContestantItem contestant={contestant} score={overlay ? null : voteValue} />;
          }}
        </Sortable>
      </div>
    </>
  );
}
