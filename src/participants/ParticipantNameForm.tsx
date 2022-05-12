import { Button, TextField } from '@mui/material';
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
      className={styles.form}
      onSubmit={(event) => {
        event.preventDefault();
        if (isValid) {
          onSubmit(name);
        }
      }}
    >
      <p>Please enter your name to join the event.</p>
      <TextField
        label="Your name"
        variant="filled"
        type="text"
        value={name}
        onChange={(event) => setName(event.currentTarget.value)}
      />
      <Button type="submit" disabled={!isValid} variant="contained">
        Join
      </Button>
    </form>
  );
}
