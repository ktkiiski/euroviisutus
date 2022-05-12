import { sort } from 'immuton';
import { CSSProperties } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import useContest from '../contest/useContest';
import ContestantItem from '../contestants/ContestantItem';
import Participant from '../participants/Participant';
import useParticipantsCollectionRef from '../participants/useParticipantsCollectionRef';
import styles from './ResultsView.module.css';

interface ResultsViewProps {
  contestId: string;
  pollId: string;
  voteOptions: number[];
  revealCount: number;
  onRevealCountChange: (revealCount: number | null) => void;
}

function getContestantScore(code: string, participants: Participant[], voteOptions: number[]) {
  return participants.reduce((sum, { votes, ready }) => {
    if (!ready) return sum;
    const codeIndex = votes.findIndex((vote) => vote.code === code);
    const score = voteOptions[codeIndex] ?? 0;
    return sum + score;
  }, 0);
}

export default function ResultsView({
  contestId,
  pollId,
  revealCount,
  onRevealCountChange,
  voteOptions,
}: ResultsViewProps) {
  const { contestants } = useContest(contestId);
  const participantCollectionRef = useParticipantsCollectionRef(pollId);
  const [participants] = useCollectionData(participantCollectionRef);
  if (!participants) {
    return <div>Loading…</div>;
  }
  const minIndex = contestants.length - revealCount;
  const unsortedResults = contestants.map((contestant, index) => {
    const score = index >= minIndex ? getContestantScore(contestant.code, participants, voteOptions) : null;
    return { contestant, score };
  });
  const sortedResults = sort(unsortedResults, ({ score }) => (score == null ? Infinity : -score));
  return (
    <div className={styles.container}>
      <div className={styles.list}>
        {unsortedResults.map((result, originalIndex) => {
          const { contestant, score } = result;
          const sortedIndex = sortedResults.indexOf(result);
          const indexOffset = sortedIndex - originalIndex;
          const style: CSSProperties = {
            transform: `translateY(${indexOffset * 100}%)`,
            zIndex: originalIndex === minIndex ? 1 : 0,
          };
          return (
            <div className={styles.item} style={style}>
              <ContestantItem key={contestant.code} contestant={contestant} score={score} />
            </div>
          );
        })}
      </div>
      <div>
        <button type="button" onClick={() => onRevealCountChange(revealCount <= 0 ? null : revealCount - 1)}>
          «
        </button>
        <button
          type="button"
          onClick={() => onRevealCountChange(revealCount + 1)}
          disabled={revealCount >= contestants.length}
        >
          Show next
        </button>
      </div>
    </div>
  );
}
