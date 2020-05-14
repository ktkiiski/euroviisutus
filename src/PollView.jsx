/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, Redirect } from 'react-router-dom';
import GroupView from './GroupView';
import ResultView from './ResultView';
import { usePollParticipant, useCurrentParticipantId, usePollParticipantRef } from './data';
import Layout from './Layout';

const AZERBAIJAN = { id: 'AZ', name: 'Azerbaijan' };
const UNITED_KINGDOM = { id: 'UK', name: 'United Kingdom' };
const RUSSIA = { id: 'RU', name: 'Russia' };
const SWITZERLAND = { id: 'CH', name: 'Switzerland' };
const BULGARIA = { id: 'BG', name: 'Bulgaria' };
const ITALY = { id: 'IT', name: 'Italy' };
const LITHUANIA = { id: 'LT', name: 'Lithuania' };
const NORWAY = { id: 'NO', name: 'Norway' };
const SWEDEN = { id: 'SE', name: 'Sweden' };
const ROMANIA = { id: 'RO', name: 'Romania' };
const ICELAND = { id: 'IS', name: 'Iceland' };
const MALTA = { id: 'MT', name: 'Malta' };
const GERMANY = { id: 'DE', name: 'Germany' };
const ISRAEL = { id: 'IL', name: 'Israel' };
const AUSTRALIA = { id: 'AU', name: 'Australia' };
const NETHERLANDS = { id: 'NL', name: 'Netherlands' };
const GEORGIA = { id: 'GL', name: 'Georgia' };
const DENMARK = { id: 'DK', name: 'Denmark' };
const BELGIUM = { id: 'BE', name: 'Belgium' };
const SPAIN = { id: 'ES', name: 'Spain' };
const GREECE = { id: 'GR', name: 'Greece' };
const FRANCE = { id: 'FR', name: 'France' };
const POLAND = { id: 'PL', name: 'Poland' };
const ARMENIA = { id: 'AM', name: 'Armenia' };
const SERBIA = { id: 'RS', name: 'Serbia' };
const FINLAND = { id: 'FI', name: 'Finland' };

const groups = [{
  title: 'Group 1',
  description: 'Choose your top 3 from the countries from this group!',
  points: [12, 10, 8],
  countries: [
    AZERBAIJAN,
    UNITED_KINGDOM,
    RUSSIA,
    SWITZERLAND,
    BULGARIA,
  ],
}, {
  title: 'Group 2',
  description: 'Choose your top 3 from the countries from this group!',
  points: [12, 10, 8],
  countries: [
    ITALY,
    LITHUANIA,
    NORWAY,
    SWEDEN,
    ROMANIA,
  ],
}, {
  title: 'Group 3',
  description: 'Choose your top 3 from the countries from this group!',
  points: [12, 10, 8],
  countries: [
    ICELAND,
    MALTA,
    GERMANY,
    ISRAEL,
    AUSTRALIA,
  ],
}, {
  title: 'Group 4',
  description: 'Choose your top 3 from the countries from this group!',
  points: [12, 10, 8],
  countries: [
    NETHERLANDS,
    GEORGIA,
    DENMARK,
    BELGIUM,
    SPAIN,
  ],
}, {
  title: 'Group 5',
  description: 'Choose your top 3 from the countries from this group!',
  points: [12, 10, 8],
  countries: [
    GREECE,
    FRANCE,
    POLAND,
    ARMENIA,
    SERBIA,
    FINLAND,
  ],
}];

groups.push({
  title: 'Your overall favorites',
  description: 'Choose your top 5 from all the countries!',
  points: [12, 10, 8, 6, 4],
  countries: [].concat(...groups.map(({ countries }) => countries)),
});

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
      <ResultView />
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
