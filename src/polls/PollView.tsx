import ParticipantNameForm from '../participants/ParticipantNameForm';
import useMyParticipant from '../participants/useMyParticipant';
import VoteView from '../voting/VoteView';
import usePoll from './usePoll';

interface PollViewProps {
  pollId: string;
}

export default function PollView({ pollId }: PollViewProps) {
  const [poll] = usePoll(pollId);
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
          });
        }}
      />
    );
  }
  return (
    <VoteView
      poll={poll}
      votes={myParticipant.votes}
      onVotesChange={(votes) => {
        setMyParticipant({ ...myParticipant, votes });
      }}
    />
  );
}
