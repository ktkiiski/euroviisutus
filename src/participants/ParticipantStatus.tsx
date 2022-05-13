import { Checkbox, FormControlLabel } from '@mui/material';
import { updateDoc } from 'firebase/firestore';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import styles from './ParticipantStatus.module.css';
import useParticipantRef from './useParticipantRef';

interface ParticipantStatusProps {
  pollId: string;
  participantId: string;
}

export default function ParticipantStatus({ pollId, participantId }: ParticipantStatusProps) {
  const participantRef = useParticipantRef(pollId, participantId);
  const [participant] = useDocumentData(participantRef);
  return (
    <div className={styles.status}>
      <FormControlLabel
        control={
          <Checkbox
            disabled={!participant}
            checked={participant?.ready ?? false}
            onChange={
              participant &&
              ((event) => {
                const becomeReady = event.currentTarget.checked;
                updateDoc(participantRef, { ready: becomeReady });
              })
            }
          />
        }
        label="I'm ready!"
      />
    </div>
  );
}
