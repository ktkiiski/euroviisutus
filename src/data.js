import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase from 'firebase/app';
import { useMemo } from 'react';

export function useDatabase() {
  return useMemo(() => firebase.firestore(), []);
}

export function usePollParticipants(pollId) {
  const db = useDatabase();
  const [participants = []] = useCollectionData(
    db.collection('polls').doc(pollId).collection('participants'),
    { idField: 'id' },
  );
  return participants;
}
