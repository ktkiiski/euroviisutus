import { Button } from '@mui/material';
import { updateDoc } from 'firebase/firestore';
import usePollRef from './usePollRef';

interface PollCompletionButtonProps {
  pollId: string;
}

export default function PollCompletionButton({ pollId }: PollCompletionButtonProps) {
  const pollRef = usePollRef(pollId);
  const onCloseVoting = () => {
    updateDoc(pollRef, { revealCount: 0 });
  };
  return (
    <div>
      <Button type="button" variant="contained" onClick={onCloseVoting}>
        Close voting
      </Button>
    </div>
  );
}
