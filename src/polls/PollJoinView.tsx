import { setDoc } from 'firebase/firestore';
import { useState } from 'react';
import ParticipantNameForm from '../participants/ParticipantNameForm';
import useParticipantRef from '../participants/useParticipantRef';
import Loading from '../ui/Loading';

interface PollJoinViewProps {
  pollId: string;
  participantId: string;
}

export default function PollJoinView({ pollId, participantId }: PollJoinViewProps) {
  const participantRef = useParticipantRef(pollId, participantId);
  const [isJoining, setIsJoining] = useState(false);
  if (isJoining) {
    return <Loading />;
  }
  return (
    <ParticipantNameForm
      onSubmit={async (name) => {
        setIsJoining(true);
        try {
          await setDoc(participantRef, {
            id: participantId,
            name,
            votes: [],
            ready: false,
          });
        } finally {
          setIsJoining(false);
        }
      }}
    />
  );
}
