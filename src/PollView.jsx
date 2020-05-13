import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, TextField, Button } from '@material-ui/core';
import { usePollParticipants, useDatabase } from './data';

const groups = [{
  title: 'Group 1',
  description: 'Choose your top 3 from the countries from this group!',
  countries: [
    'Azerbaijan',
    'The United Kingdom',
    'Russia',
    'Switzerland',
    'Bulgaria',
  ],
}, {
  title: 'Group 2',
  description: 'Choose your top 3 from the countries from this group!',
  countries: [
    'Italy',
    'Lithuania',
    'Norway',
    'Sweden',
    'Romania',
  ],
}, {
  title: 'Group 3',
  description: 'Choose your top 3 from the countries from this group!',
  countries: [
    'Iceland',
    'Malta',
    'Germany',
    'Israel',
    'Australia',
  ],
}, {
  title: 'Group 4',
  description: 'Choose your top 3 from the countries from this group!',
  countries: [
    'The Netherlands',
    'Georgia',
    'Denmark',
    'Belgium',
    'Spain',
  ],
}, {
  title: 'Group 5',
  description: 'Choose your top 3 from the countries from this group!',
  countries: [
    'Greece',
    'France',
    'Poland',
    'Armenia',
    'Serbia',
    'Finland',
  ],
}];

groups.push({
  title: 'Your overall favorites',
  description: 'Choose your top 5 from all the countries!',
  countries: [].concat(...groups.map(({ countries }) => countries)),
});

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
