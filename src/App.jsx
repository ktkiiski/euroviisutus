import React, { useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase from 'firebase/app';
import logo from './logo.svg';
import './App.css';

const pollId = 'dev';

function App() {
  const db = firebase.firestore();
  const [newName, setNewName] = useState('');
  const [participants = []] = useCollectionData(
    db.collection('polls').doc(pollId).collection('participants'),
    { idField: 'id' },
  );
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {participants.map((participant) => (
          <p key={participant.id}>{participant.name}</p>
        ))}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
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
      </header>
    </div>
  );
}

export default App;
