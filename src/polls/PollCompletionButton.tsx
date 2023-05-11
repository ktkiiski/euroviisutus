import { Box, Button } from '@mui/material';
import { updateDoc } from 'firebase/firestore';
import { useHref } from 'react-router-dom';
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
  const dashboardHref = useHref('./dashboard');
  if (!isHost) {
    return null;
  }
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: 2 }}>
      <Button type="button" variant="contained" color="secondary" href={dashboardHref} target="dashboard">
        Dashboard
      </Button>
      <Button type="button" variant="contained" onClick={onCloseVoting}>
        Close voting
      </Button>
    </Box>
  );
}
