import { Button } from '@mui/material';
import { sort } from 'immuton';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { CSSTransitionClassNames } from 'react-transition-group/CSSTransition';
import useContest from '../contest/useContest';
import ContestantItem from '../contestants/ContestantItem';
import Participant from '../participants/Participant';
import useIsPollHost from '../participants/useIsPollHost';
import useParticipantsCollectionRef from '../participants/useParticipantsCollectionRef';
import Title from '../ui/Title';
import styles from './ResultsView.module.css';
import useCelebration from './useCelebration';

interface ResultsViewProps {
  contestId: string;
  pollId: string;
  participantId?: string;
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

const transitionClassNames: CSSTransitionClassNames = {
  enter: styles.itemEnter,
  enterActive: styles.itemEnterActive,
  exit: styles.itemExit,
  exitActive: styles.itemExitActive,
};

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
  const minIndex = contestants.length - revealCount;
  const celebration = useCelebration(minIndex === 0);
  if (!participants) {
    return <div>Loading…</div>;
  }
  const unsortedResults = contestants.map((contestant) => {
    const score = getContestantScore(contestant.code, participants, voteOptions);
    return { contestant, score };
  });
  const sortedResults = sort(unsortedResults, ({ score }) => (score == null ? Infinity : -score));
  const rankedResults = sortedResults.map((result, index) => ({
    ranking: index + 1,
    ...result,
  }));
  const visibleResults = rankedResults.slice(minIndex);
  return (
    <>
      <Title>{`${title} Results`}</Title>
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
      <TransitionGroup className={styles.list}>
        {visibleResults.map((result, index) => {
          const { contestant, score, ranking } = result;
          return (
            <CSSTransition key={ranking} classNames={transitionClassNames} timeout={500}>
              <div className={styles.item}>
                <ContestantItem ranking={ranking} code={contestant.code} score={score} highlight={index === 0} />
              </div>
            </CSSTransition>
          );
        })}
      </TransitionGroup>
      {celebration}
    </>
  );
}
