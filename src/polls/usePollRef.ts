import { doc } from 'firebase/firestore';
import { useMemo } from 'react';
import { db } from '../firebase';
import pollConverter from './pollConverter';

export default function usePollRef(id: string) {
  return useMemo(() => doc(db, 'polls', id).withConverter(pollConverter), [id]);
}
