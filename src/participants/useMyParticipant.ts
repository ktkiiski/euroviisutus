import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { useStorage } from 'react-tidy';
import { db } from '../firebase';
import Participant from './Participant';
import participantConverter from './participantConverter';

export default function useMyParticipant(
  pollId: string,
): [Participant | undefined, boolean, (participant: Omit<Participant, 'id'>) => Promise<void>] {
  const [isCreating, setIsCreating] = useState(false);
  const [myParticipantId, setMyParticipantId] = useStorage<string>('participantId', null);
  const participantCollection = collection(db, 'polls', pollId, 'participants').withConverter(participantConverter);
  const myParticipantRef = myParticipantId != null ? doc(participantCollection, myParticipantId) : null;
  const [myParticipant, isLoading] = useDocumentData(myParticipantRef);
  const setParticipant = async (data: Omit<Participant, 'id'>) => {
    if (myParticipantRef) {
      // Replace participant
      await setDoc(myParticipantRef, data);
    } else {
      // Create a new participant
      setIsCreating(true);
      try {
        const docRef = await addDoc(participantCollection, data);
        const { id } = docRef;
        setMyParticipantId(id);
      } finally {
        setIsCreating(false);
      }
    }
  };
  return [myParticipant, isLoading || isCreating, setParticipant];
}
