import useContest from '../contest/useContest';
import ContestantItem from '../contestants/ContestantItem';
import Sortable from '../utils/Sortable';
import Vote from './Vote';
import styles from './VoteView.module.css';

interface VoteViewProps {
  contestId: string;
  voteOptions: number[];
  votes: Vote[];
  onVotesChange: (votes: Vote[]) => void;
}

export default function VoteView({ contestId, votes, voteOptions, onVotesChange }: VoteViewProps) {
  const contest = useContest(contestId);
  const { contestants } = contest;
  const contestantCodes = contestants.map((contestant) => contestant.code);
  const voteCodes = votes.map((vote) => vote.code).filter((code) => code != null) as string[];
  const items = [...voteCodes, ...contestantCodes.filter((code) => !voteCodes.includes(code))];
  return (
    <>
      <h3>{contest.id}</h3>
      <div className={styles.list}>
        <Sortable
          items={items}
          onSort={(sortedCodes) => {
            onVotesChange(sortedCodes.map((code) => ({ code })));
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
