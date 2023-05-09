import { Box, Button, FormControl, InputLabel, NativeSelect } from '@mui/material';
import { addDoc, collection } from 'firebase/firestore';
import { FormEventHandler, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import contests from '../contest/contests';
import { db } from '../firebase';
import Logo from '../ui/Logo';
import Title from '../ui/Title';
import Poll from './Poll';
import pollConverter from './pollConverter';

const pollCollection = collection(db, 'polls').withConverter(pollConverter);

export default function PollCreateForm() {
  const navigate = useNavigate();
  const [{ id: defaultContestId }] = contests;
  const [contestId, setContestId] = useState(defaultContestId);
  const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const pollInitialData: Omit<Poll, 'id'> = {
      contestId,
      hosts: [],
      voteOptions: [12, 10, 8, 6, 4],
    };
    const pollRef = await addDoc(pollCollection, pollInitialData);
    const pollId = pollRef.id;
    navigate(`/polls/${encodeURIComponent(pollId)}`);
  };
  return (
    <>
      <Logo />
      <Title>Welcome!</Title>
      <form onSubmit={onSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <FormControl>
            <InputLabel variant="standard" htmlFor="contest-select">
              Select contest
            </InputLabel>
            <NativeSelect
              value={contestId}
              onChange={(event) => {
                setContestId(event.currentTarget.value);
              }}
              inputProps={{
                name: 'contest',
                id: 'contest-select',
              }}
            >
              {contests.map((contest) => (
                <option key={contest.id} value={contest.id}>
                  {contest.title}
                </option>
              ))}
            </NativeSelect>
          </FormControl>
          <Button type="submit" variant="contained">
            Start event
          </Button>
        </Box>
      </form>
    </>
  );
}
