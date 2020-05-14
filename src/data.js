import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore';
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

export function usePollParticipantRef(pollId, participantId) {
  const db = useDatabase();
  return pollId && participantId
    ? db.collection('polls').doc(pollId).collection('participants').doc(participantId)
    : undefined;
}

export function usePollParticipant(pollId, participantId) {
  const participantRef = usePollParticipantRef(pollId, participantId);
  const [participant, loading] = useDocumentData(participantRef, { idField: 'id' });
  return participant || (loading ? undefined : null);
}

export function useCurrentParticipantName() {
  return localStorage.getItem('participant') || null;
}

export function identifyParticipant(name) {
  return name.trim().toLowerCase();
}

export function useCurrentParticipantId() {
  const name = useCurrentParticipantName();
  return name && identifyParticipant(name);
}
