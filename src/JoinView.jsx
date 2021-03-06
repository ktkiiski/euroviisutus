import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  TextField, Button, FormGroup, Box, Typography,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useDatabase, identifyParticipant } from './data';
import Layout from './Layout';
import ParticipantList from './ParticipantList';
import ScrollToTop from './ScrollToTop';
import coverImageUrl from './eurovision.jpg';

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
      coverImageUrl={coverImageUrl}
      title="Join Eurovision"
      description="Welcome to the Eurovision Song Contest 2020 party event to vote for your favorite songs! Join by entering your unique nickname below and hitting the joins button!"
    >
      <ScrollToTop />
      <Box component="form" onSubmit={onSubmit} my={2}>
        <FormGroup>
          <TextField
            label="Your nickname"
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
      </Box>
      <Box my={2}>
        <Typography variant="h6">Participants</Typography>
        <ParticipantList pollId={pollId} />
      </Box>
    </Layout>
  );
}

JoinView.propTypes = {
  pollId: PropTypes.string.isRequired,
};

export default JoinView;
