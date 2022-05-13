import { updateDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore';
import { v4 as uuid } from 'uuid';
import ParticipantList from '../participants/ParticipantList';
import ParticipantStatus from '../participants/ParticipantStatus';
import useMyParticipantId from '../participants/useMyParticipantId';
import useParticipantsCollectionRef from '../participants/useParticipantsCollectionRef';
import ResultsView from '../results/ResultsView';
import Loading from '../ui/Loading';
import VoteView from '../voting/VoteView';
import PollCompletionButton from './PollCompletionButton';
import PollJoinView from './PollJoinView';
import usePollRef from './usePollRef';

interface PollViewProps {
  pollId: string;
}

export default function PollView({ pollId }: PollViewProps) {
  const pollRef = usePollRef(pollId);
  const [poll] = useDocumentData(pollRef);
  const [myParticipantId, setMyParticipantId] = useMyParticipantId();
  const participantsCollectionRef = useParticipantsCollectionRef(pollId);
  const [participants] = useCollectionData(participantsCollectionRef);

  /**
   * Generate an identifier for the user if missing.
   */
  useEffect(() => {
    if (!myParticipantId) {
      setMyParticipantId(uuid());
    }
  }, [myParticipantId, setMyParticipantId]);

  if (!myParticipantId || !poll || !participants) {
    return <Loading />;
  }
  const myParticipant = participants.find((participant) => participant.id === myParticipantId);
  if (!myParticipant) {
    return <PollJoinView pollId={pollId} participantId={myParticipantId} />;
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
  // Voting is on. Show the voting UI
  return (
    <>
      <VoteView
        participantId={myParticipantId}
        pollId={pollId}
        contestId={poll.contestId}
        voteOptions={poll.voteOptions}
      />
      <ParticipantStatus participantId={myParticipantId} pollId={pollId} />
      <ParticipantList pollId={pollId} />
      <PollCompletionButton pollId={pollId} />
    </>
  );
}
