import { Box } from '@mui/material';
import { updateDoc } from 'firebase/firestore';
import { QRCodeSVG } from 'qrcode.react';
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore';
import ParticipantList from '../participants/ParticipantList';
import useParticipantsCollectionRef from '../participants/useParticipantsCollectionRef';
import ResultsView from '../results/ResultsView';
import Loading from '../ui/Loading';
import Title from '../ui/Title';
import usePollRef from './usePollRef';

interface PollViewProps {
  pollId: string;
}

export default function PollDashboard({ pollId }: PollViewProps) {
  const pollRef = usePollRef(pollId);
  const [poll] = useDocumentData(pollRef);
  const participantsCollectionRef = useParticipantsCollectionRef(pollId);
  const [participants] = useCollectionData(participantsCollectionRef);

  if (!poll || !participants) {
    return <Loading />;
  }
  const { revealCount } = poll;
  if (revealCount != null) {
    // Voting is closed. See the results
    return (
      <ResultsView
        contestId={poll.contestId}
        pollId={pollId}
        voteOptions={poll.voteOptions}
        revealCount={revealCount}
        onRevealCountChange={(newRevealCount) => {
          updateDoc(pollRef, { revealCount: newRevealCount });
        }}
      />
    );
  }
  // Voting is on. Show the voting QR code and the participant list
  const pollUrl = `${window.location.origin}/polls/${encodeURIComponent(pollId)}`;
  return (
    <Box
      sx={{
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
        justifyContent: 'center',
      }}
    >
      <Title>Join the party!</Title>
      <QRCodeSVG value={pollUrl} size={350} includeMargin style={{ maxWidth: '100%', maxHeight: '90vw' }} />
      <ParticipantList pollId={pollId} />
    </Box>
  );
}
