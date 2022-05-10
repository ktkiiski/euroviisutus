import useContest from '../contest/useContest';
import CountryLabel from '../countries/CountryLabel';
import Poll from '../polls/Poll';
import Sortable from '../utils/Sortable';
import Vote from './Vote';
import styles from './VoteView.module.css';

interface VoteViewProps {
  poll: Poll;
  votes: Vote[];
  onVotesChange: (votes: Vote[]) => void;
}

const voteOptions = [12, 10, 8, 6, 4];

export default function VoteView({ poll, votes, onVotesChange }: VoteViewProps) {
  const contest = useContest(poll.contestId);
  const { contestants } = contest;
  const contestantCodes = contestants.map((contestant) => contestant.code);
  const voteCodes = votes.map((vote) => vote.code).filter((code) => code != null) as string[];
  const items = [...voteCodes, ...contestantCodes.filter((code) => !voteCodes.includes(code))];
  return (
    <div className={styles.container}>
      <h3>{contest.id}</h3>
      <div className={styles.list}>
        <Sortable
          items={items}
          onSort={(sortedCodes) => {
            onVotesChange(sortedCodes.map((code) => ({ code })));
          }}
        >
          {(code, index) => {
            const voteValue: number | undefined = voteOptions[index];
            const contestant = contestants.find((c) => c.code === code)!;
            return (
              <div className={styles.item}>
                {`#${contestant.draw} `}
                <CountryLabel code={contestant.code} />
                {voteValue != null && <span>{` ${voteValue}pt`}</span>}
              </div>
            );
          }}
        </Sortable>
      </div>
    </div>
  );
}
