import useContest from '../contest/useContest';
import CountryLabel from '../countries/CountryLabel';
import Poll from '../polls/Poll';
import Vote from './Vote';
import styles from './VoteView.module.css';

interface VoteViewProps {
  poll: Poll;
  votes: Vote[];
  onVotesChange: (votes: Vote[]) => void;
}

const voteOptions = [12, 10, 8];

export default function VoteView({ poll, votes, onVotesChange }: VoteViewProps) {
  const contest = useContest(poll.contestId);
  const onVote = (code: string, voteIndex: number) => {
    onVotesChange(
      voteOptions.map<Vote>((_, idx) => {
        if (voteIndex === idx) {
          // Set this index to the new vote
          return { code };
        }
        if (votes[idx]?.code === code) {
          // Toggle any other vote for this code to null
          return { code: null };
        }
        // Ensure that all other vote indexes have values
        return votes[idx] || { code: null };
      }),
    );
  };
  return (
    <div className={styles.container}>
      <h3>{contest.id}</h3>
      <ul>
        {contest.contestants.map((contestant) => (
          <li key={contestant.code}>
            {`#${contestant.draw} `}
            <CountryLabel code={contestant.code} />
            {voteOptions.map((value, index) => (
              <button type="button" key={value} onClick={() => onVote(contestant.code, index)}>
                {votes.some((vote, voteIdx) => voteIdx === index && vote.code === contestant.code) ? '*' : ''}
                {value}
              </button>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}
