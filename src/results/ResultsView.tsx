import { Button } from '@mui/material';
import { sort } from 'immuton';
import { CSSProperties } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import useContest from '../contest/useContest';
import ContestantItem from '../contestants/ContestantItem';
import Participant from '../participants/Participant';
import useIsPollHost from '../participants/useIsPollHost';
import useParticipantsCollectionRef from '../participants/useParticipantsCollectionRef';
import Title from '../ui/Title';
import styles from './ResultsView.module.css';

interface ResultsViewProps {
  contestId: string;
  pollId: string;
  participantId: string;
  voteOptions: number[];
  revealCount: number;
  onRevealCountChange: (revealCount: number | null) => void;
}

function getContestantScore(code: string, participants: Participant[], voteOptions: number[]) {
  return participants.reduce((sum, { votes, ready }) => {
    if (!ready) return sum;
    const codeIndex = votes.indexOf(code);
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
  participantId,
}: ResultsViewProps) {
  const { contestants, title } = useContest(contestId);
  const participantCollectionRef = useParticipantsCollectionRef(pollId);
  const [participants] = useCollectionData(participantCollectionRef);
  const isHost = useIsPollHost(pollId, participantId);
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
    <>
      <Title>{`${title} Results`}</Title>
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
            <div className={styles.item} style={style} key={result.contestant.code}>
              <ContestantItem key={contestant.code} contestant={contestant} score={score} />
            </div>
          );
        })}
      </div>
      {isHost && (
        <div className={styles.controls}>
          <Button
            type="button"
            variant="contained"
            onClick={() => onRevealCountChange(revealCount <= 0 ? null : revealCount - 1)}
          >
            Back
          </Button>
          <Button
            type="button"
            variant="contained"
            onClick={() => onRevealCountChange(revealCount + 1)}
            disabled={revealCount >= contestants.length}
          >
            Show next
          </Button>
        </div>
      )}
    </>
  );
}
