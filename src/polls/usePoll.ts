import { doc } from 'firebase/firestore';
import { useMemo } from 'react';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import pollConverter from './pollConverter';

export default function usePoll(id: string) {
  const docRef = useMemo(() => doc(db, 'polls', id).withConverter(pollConverter), [id]);
  return useDocumentData(docRef);
}
