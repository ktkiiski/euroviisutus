import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, Button, FormGroup } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useDatabase, identifyParticipant } from './data';
import Layout from './Layout';
import ParticipantList from './ParticipantList';

function JoinView({ pollId }) {
  const history = useHistory();
  const db = useDatabase();
  const [name, setName] = useState(localStorage.getItem('participant') || '');
  const onNameChange = (event) => {
    setName(event.currentTarget.value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    const participantId = identifyParticipant(name);
    const participantRef = db.collection('polls')
      .doc(pollId)
      .collection('participants')
      .doc(participantId);
    const participantDoc = await participantRef.get();
    await participantRef.set({
      ...participantDoc.exists ? participantDoc.data() : null,
      name,
    });
    localStorage.setItem('participant', name);
    history.push(`/poll/${pollId}/0`);
  };
  return (
    <Layout
      title="Join Eurovision"
      description="Enter your name to participate!"
    >
      <form onSubmit={onSubmit}>
        <FormGroup>
          <TextField
            label="Your name"
            variant="filled"
            value={name}
            onChange={onNameChange}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!name}
          >
            Join Eurovision!
          </Button>
        </FormGroup>
      </form>
      <ParticipantList pollId={pollId} />
    </Layout>
  );
}

JoinView.propTypes = {
  pollId: PropTypes.string.isRequired,
};

export default JoinView;
