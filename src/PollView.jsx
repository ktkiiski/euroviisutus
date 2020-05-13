import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { usePollParticipants, useDatabase } from './data';


function PollView({ pollId }) {
  const db = useDatabase();
  const participants = usePollParticipants(pollId);
  const [newName, setNewName] = useState('');
  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const participantId = newName.toLowerCase();
          db.collection('polls')
            .doc(pollId)
            .collection('participants')
            .doc(participantId)
            .set({ name: newName });
          setNewName('');
        }}
      >
        <input type="text" value={newName} onChange={(ev) => setNewName(ev.currentTarget.value)} />
        <button type="submit" disabled={!newName}>Add</button>
      </form>
      <ul>
        {participants.map((participant) => (
          <li key={participant.id}>{participant.name}</li>
        ))}
      </ul>
    </>
  );
}

PollView.propTypes = {
  pollId: PropTypes.string.isRequired,
};

export default PollView;
