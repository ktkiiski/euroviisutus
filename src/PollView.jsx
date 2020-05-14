/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, Redirect } from 'react-router-dom';
import GroupView from './GroupView';
import ResultView from './ResultView';
import { usePollParticipant, useCurrentParticipantId, usePollParticipantRef } from './data';
import Layout from './Layout';
import { groups } from './countries';

function PollView({ groupIndex, pollId }) {
  const participantId = useCurrentParticipantId();
  const participantRef = usePollParticipantRef(pollId, participantId);
  const participant = usePollParticipant(pollId, participantId);
  const [defaultVotes] = useState(
    () => groups.map((group) => ({
      votes: group.points.map(() => null),
    })),
  );
  const history = useHistory();
  if (!participantId && participant === null) {
    return (
      <Redirect to={`/poll/${pollId}/join`} />
    );
  }
  if (!participant) {
    return (
      <Layout
        title="Loading…"
        description="Please wait for a moment."
      />
    );
  }
  const votes = participant.votes || defaultVotes;
  const group = groups[groupIndex];
  const onVotesChange = (groupVotes) => {
    const newVotes = votes.slice();
    newVotes[groupIndex] = { votes: groupVotes };
    participantRef.update({
      votes: newVotes,
    });
  };
  const onSubmit = () => {
    history.push(`/poll/${pollId}/${groupIndex + 1}`);
  };
  if (!group) {
    // Completed!
    return (
      <ResultView pollId={pollId} />
    );
  }
  return (
    <GroupView
      {...group}
      votes={votes[groupIndex].votes}
      onVotesChange={onVotesChange}
      onSubmit={onSubmit}
    />
  );
}

PollView.propTypes = {
  groupIndex: PropTypes.number.isRequired,
  pollId: PropTypes.string.isRequired,
};

export default PollView;
