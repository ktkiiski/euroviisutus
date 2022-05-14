import { updateDoc } from 'firebase/firestore';
import { union } from 'immuton';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import useContest from '../contest/useContest';
import ContestantItem from '../contestants/ContestantItem';
import useParticipantRef from '../participants/useParticipantRef';
import Loading from '../ui/Loading';
import Title from '../ui/Title';
import Sortable from '../utils/Sortable';
import styles from './VoteView.module.css';

interface VoteViewProps {
  participantId: string;
  pollId: string;
  contestId: string;
  voteOptions: number[];
}

export default function VoteView({ participantId, pollId, contestId, voteOptions }: VoteViewProps) {
  const participantRef = useParticipantRef(pollId, participantId);
  const [participant] = useDocumentData(participantRef);
  const contest = useContest(contestId);
  const { contestants, title } = contest;
  const contestantCodes = contestants.map((contestant) => contestant.code);
  if (!participant) {
    return <Loading />;
  }
  const { votes } = participant;
  const items = union([votes, contestantCodes]);
  return (
    <>
      <Title>{title}</Title>
      <div className={styles.list}>
        <Sortable
          items={items}
          onSort={(sortedCodes) => {
            updateDoc(participantRef, { votes: sortedCodes });
          }}
        >
          {(code, index, overlay) => {
            const voteValue: number | undefined = voteOptions[index];
            const contestant = contestants.find((c) => c.code === code)!;
            return (
              <ContestantItem
                ranking={contestant.draw}
                code={contestant.code}
                score={overlay ? null : voteValue}
                highlight={overlay}
              />
            );
          }}
        </Sortable>
      </div>
    </>
  );
}
