import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, TextField, Button } from '@material-ui/core';
import { usePollParticipants, useDatabase } from './data';


function PollView({ pollId }) {
  const db = useDatabase();
  const participants = usePollParticipants(pollId);
  const [newName, setNewName] = useState('');
  const onNameChange = (event) => {
    setNewName(event.currentTarget.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    const participantId = newName.toLowerCase();
    db.collection('polls')
      .doc(pollId)
      .collection('participants')
      .doc(participantId)
      .set({ name: newName });
    setNewName('');
  };
  return (
    <>
      <Container maxWidth="sm">
        <form onSubmit={onSubmit}>
          <TextField
            label="Your name"
            variant="filled"
            value={newName}
            onChange={onNameChange}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!newName}
          >
            Join Eurovision!
          </Button>
        </form>
        <ul>
          {participants.map((participant) => (
            <li key={participant.id}>{participant.name}</li>
          ))}
        </ul>
      </Container>
    </>
  );
}

PollView.propTypes = {
  pollId: PropTypes.string.isRequired,
};

export default PollView;
