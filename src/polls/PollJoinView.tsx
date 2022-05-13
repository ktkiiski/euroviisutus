import { setDoc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import ParticipantNameForm from '../participants/ParticipantNameForm';
import useParticipantRef from '../participants/useParticipantRef';
import Loading from '../ui/Loading';
import usePollRef from './usePollRef';

interface PollJoinViewProps {
  pollId: string;
  participantId: string;
}

export default function PollJoinView({ pollId, participantId }: PollJoinViewProps) {
  const pollRef = usePollRef(pollId);
  const participantRef = useParticipantRef(pollId, participantId);
  const [poll] = useDocumentData(pollRef);
  const [isJoining, setIsJoining] = useState(false);
  if (isJoining || !poll) {
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
          if (!poll.hosts.length) {
            await updateDoc(pollRef, {
              hosts: [participantId],
            });
          }
        } finally {
          setIsJoining(false);
        }
      }}
    />
  );
}
