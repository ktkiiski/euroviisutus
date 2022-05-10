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
    <ul className={styles.list}>
      {participants?.map((participant) => (
        <li key={participant.id} className={styles.listItem}>
          {participant.name} {participant.ready ? 'Ready' : 'Not ready'}
        </li>
      ))}
    </ul>
  );
}
