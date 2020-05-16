import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore';
import firebase from 'firebase/app';
import { useMemo, useCallback, useState } from 'react';
import { groups, countries } from './countries';

export function useDatabase() {
  return useMemo(() => firebase.firestore(), []);
}

export function usePollParticipants(pollId) {
  const db = useDatabase();
  const [participants, loading, error] = useCollectionData(
    db.collection('polls').doc(pollId).collection('participants'),
    { idField: 'id' },
  );
  if (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
  return loading ? undefined : (participants || null);
}

export function usePollRef(pollId) {
  const db = useDatabase();
  return useMemo(
    () => (pollId ? db.collection('polls').doc(pollId) : undefined),
    [db, pollId],
  );
}

export function usePoll(pollId) {
  const pollRef = usePollRef(pollId);
  const [poll, loading, error] = useDocumentData(pollRef, { idField: 'id' });
  if (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
  return poll || (loading ? undefined : null);
}

export function usePollParticipantRef(pollId, participantId) {
  const pollRef = usePollRef(pollId);
  return useMemo(() => (
    pollRef && participantId
      ? pollRef.collection('participants').doc(participantId)
      : undefined
  ), [pollRef, participantId]);
}

export function usePollParticipant(pollId, participantId) {
  const participantRef = usePollParticipantRef(pollId, participantId);
  const [participant, loading, error] = useDocumentData(participantRef, { idField: 'id' });
  if (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
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

export function getCountryScore(participants, countryId) {
  let score = 0;
  groups.forEach(({ points }, groupIndex) => {
    participants.forEach(({ votes }) => {
      const groupItem = votes && votes[groupIndex];
      const groupVotes = (groupItem && groupItem.votes) || [];
      points.forEach((point, pointIndex) => {
        if (groupVotes[pointIndex] === countryId) {
          score += point;
        }
      });
    });
  });
  return score;
}

export function useFinalRankings(pollId) {
  const participants = usePollParticipants(pollId);
  if (!participants) {
    return participants;
  }
  const rankings = countries.map(((country) => ({
    country,
    score: getCountryScore(participants, country.id),
  })));
  return rankings.sort((r1, r2) => {
    if (r1.score < r2.score) {
      return 1;
    }
    if (r1.score > r2.score) {
      return -1;
    }
    return 0;
  });
}

export function useHostStatus() {
  const [isHost, setCachedIsHost] = useState(localStorage.getItem('host') === 'true');
  const setIsHost = useCallback((isNowHost) => {
    if (isNowHost) {
      localStorage.setItem('host', 'true');
    } else {
      localStorage.removeItem('host');
    }
    setCachedIsHost(isNowHost);
  }, []);
  return [isHost, setIsHost];
}
