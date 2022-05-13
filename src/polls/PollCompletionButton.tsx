import { Button } from '@mui/material';
import { updateDoc } from 'firebase/firestore';
import useIsPollHost from '../participants/useIsPollHost';
import usePollRef from './usePollRef';

interface PollCompletionButtonProps {
  pollId: string;
  participantId: string;
}

export default function PollCompletionButton({ pollId, participantId }: PollCompletionButtonProps) {
  const pollRef = usePollRef(pollId);
  const isHost = useIsPollHost(pollId, participantId);
  const onCloseVoting = () => {
    updateDoc(pollRef, { revealCount: 0 });
  };
  if (!isHost) {
    return null;
  }
  return (
    <div>
      <Button type="button" variant="contained" onClick={onCloseVoting}>
        Close voting
      </Button>
    </div>
  );
}
