import { Checkbox, FormControlLabel } from '@mui/material';
import styles from './ParticipantStatus.module.css';

interface ParticipantStatusProps {
  ready: boolean;
  onChange: (ready: boolean) => void;
}

export default function ParticipantStatus({ ready, onChange }: ParticipantStatusProps) {
  return (
    <div className={styles.status}>
      <FormControlLabel
        control={<Checkbox checked={ready} onChange={(event) => onChange(event.currentTarget.checked)} />}
        label="I'm ready!"
      />
    </div>
  );
}
