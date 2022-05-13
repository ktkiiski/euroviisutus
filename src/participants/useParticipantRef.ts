import { doc } from 'firebase/firestore';
import { useMemo } from 'react';
import { db } from '../firebase';
import participantConverter from './participantConverter';

export default function useParticipantRef(pollId: string, participantId: string) {
  return useMemo(
    () => doc(db, 'polls', pollId, 'participants', participantId).withConverter(participantConverter),
    [pollId, participantId],
  );
}
