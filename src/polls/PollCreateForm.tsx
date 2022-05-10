import { addDoc, collection } from 'firebase/firestore';
import { FormEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import contests from '../contest/contests';
import { db } from '../firebase';
import Poll from './Poll';
import pollConverter from './pollConverter';

const pollCollection = collection(db, 'polls').withConverter(pollConverter);

export default function PollCreateForm() {
  const navigate = useNavigate();
  const [{ id: contestId }] = contests;
  const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const pollInitialData: Omit<Poll, 'id'> = {
      contestId,
      hosts: [],
    };
    const pollRef = await addDoc(pollCollection, pollInitialData);
    const pollId = pollRef.id;
    navigate(`/polls/${encodeURIComponent(pollId)}`);
  };
  return (
    <form onSubmit={onSubmit}>
      <button type="submit">Start event</button>
    </form>
  );
}
