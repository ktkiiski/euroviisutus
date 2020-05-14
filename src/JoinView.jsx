import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, TextField, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { usePollParticipants, useDatabase, identifyParticipant } from './data';

function JoinView({ pollId }) {
  const history = useHistory();
  const db = useDatabase();
  const participants = usePollParticipants(pollId);
  const [name, setName] = useState(localStorage.getItem('participant') || '');
  const onNameChange = (event) => {
    setName(event.currentTarget.value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    const participantId = identifyParticipant(name);
    await db.collection('polls')
      .doc(pollId)
      .collection('participants')
      .doc(participantId)
      .update({ name });
    localStorage.setItem('participant', name);
    history.push(`/poll/${pollId}`);
  };
  return (
    <Container maxWidth="sm">
      <form onSubmit={onSubmit}>
        <div>
          <TextField
            label="Your name"
            variant="filled"
            value={name}
            onChange={onNameChange}
          />
        </div>
        <div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!name}
          >
            Join Eurovision!
          </Button>
        </div>
      </form>
      <ul>
        {participants.map((participant) => (
          <li key={participant.id}>{participant.name}</li>
        ))}
      </ul>
    </Container>
  );
}

JoinView.propTypes = {
  pollId: PropTypes.string.isRequired,
};

export default JoinView;
