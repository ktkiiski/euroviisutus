import { collection } from 'firebase/firestore';
import { useMemo } from 'react';
import { db } from '../firebase';
import participantConverter from './participantConverter';

export default function useParticipantsCollectionRef(pollId: string) {
  return useMemo(() => collection(db, 'polls', pollId, 'participants').withConverter(participantConverter), [pollId]);
}
