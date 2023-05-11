import { useDocumentData } from 'react-firebase-hooks/firestore';
import usePollRef from '../polls/usePollRef';

export default function useIsPollHost(pollId: string, participantId?: string | null): boolean | undefined {
  const pollRef = usePollRef(pollId);
  const [poll] = useDocumentData(pollRef);
  return participantId != null && poll?.hosts?.includes(participantId);
}
