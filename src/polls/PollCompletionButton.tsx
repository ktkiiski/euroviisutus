import { Button } from '@mui/material';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import pollConverter from './pollConverter';

interface PollCompletionButtonProps {
  pollId: string;
}

export default function PollCompletionButton({ pollId }: PollCompletionButtonProps) {
  const onCloseVoting = () => {
    const pollRef = doc(db, 'polls', pollId).withConverter(pollConverter);
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
