import { useDocumentData } from 'react-firebase-hooks/firestore';
import usePollRef from '../polls/usePollRef';

export default function useIsPollHost(pollId: string, participantId: string): boolean | undefined {
  const pollRef = usePollRef(pollId);
  const [poll] = useDocumentData(pollRef);
  return poll?.hosts?.includes(participantId);
}
