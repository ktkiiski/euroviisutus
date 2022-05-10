import { useState } from 'react';
import styles from './ParticipantNameForm.module.css';

interface ParticipantNameFormProps {
  onSubmit: (name: string) => void;
}

export default function ParticipantNameForm({ onSubmit }: ParticipantNameFormProps) {
  const [name, setName] = useState('');
  const isValid = /\S/.test(name);
  return (
    <form
      className={styles.container}
      onSubmit={(event) => {
        event.preventDefault();
        if (isValid) {
          onSubmit(name);
        }
      }}
    >
      <p>Please enter your name:</p>
      <input type="text" value={name} onChange={(event) => setName(event.currentTarget.value)} />
      <button type="submit" disabled={!isValid}>
        OK
      </button>
    </form>
  );
}
