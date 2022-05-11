import { updateDoc } from 'firebase/firestore';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import ParticipantList from '../participants/ParticipantList';
import ParticipantNameForm from '../participants/ParticipantNameForm';
import ParticipantStatus from '../participants/ParticipantStatus';
import useMyParticipant from '../participants/useMyParticipant';
import ResultsView from '../results/ResultsView';
import VoteView from '../voting/VoteView';
import PollCompletionButton from './PollCompletionButton';
import usePollRef from './usePollRef';

interface PollViewProps {
  pollId: string;
}

export default function PollView({ pollId }: PollViewProps) {
  const pollRef = usePollRef(pollId);
  const [poll] = useDocumentData(pollRef);
  const [myParticipant, loadingMyParticipant, setMyParticipant] = useMyParticipant(pollId);
  if (!poll || (!myParticipant && loadingMyParticipant)) {
    return <div>Loading…</div>;
  }
  if (!myParticipant) {
    return (
      <ParticipantNameForm
        onSubmit={(name) => {
          setMyParticipant({
            name,
            votes: [],
            ready: false,
          });
        }}
      />
    );
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
        contestId={poll.contestId}
        voteOptions={poll.voteOptions}
        votes={myParticipant.votes}
        onVotesChange={(votes) => {
          setMyParticipant({ ...myParticipant, votes });
        }}
      />
      <ParticipantStatus
        ready={myParticipant.ready}
        onChange={(ready) => {
          setMyParticipant({ ...myParticipant, ready });
        }}
      />
      <ParticipantList pollId={pollId} />
      <PollCompletionButton pollId={pollId} />
    </>
  );
}
