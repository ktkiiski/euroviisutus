import { Chip } from '@mui/material';
import { collection } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import styles from './ParticipantList.module.css';
import participantConverter from './participantConverter';

interface ParticipantListProps {
  pollId: string;
}

export default function ParticipantList({ pollId }: ParticipantListProps) {
  const participantPollection = collection(db, 'polls', pollId, 'participants').withConverter(participantConverter);
  const [participants] = useCollectionData(participantPollection);
  return (
    <div className={styles.list}>
      {participants?.map((participant) => (
        <Chip
          key={participant.id}
          label={participant.name}
          color={participant.ready ? 'success' : 'default'}
          variant={participant.ready ? 'filled' : 'outlined'}
        />
      ))}
    </div>
  );
}
