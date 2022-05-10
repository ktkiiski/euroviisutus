import styles from './ParticipantStatus.module.css';

interface ParticipantStatusProps {
  ready: boolean;
  onChange: (ready: boolean) => void;
}

export default function ParticipantStatus({ ready, onChange }: ParticipantStatusProps) {
  return (
    <div className={styles.status}>
      <input type="checkbox" checked={ready} onChange={(event) => onChange(event.currentTarget.checked)} />
      <span>{`I'm ready`}</span>
    </div>
  );
}
