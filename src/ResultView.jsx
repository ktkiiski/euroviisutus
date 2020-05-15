import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import {
  FormGroup, Button, Box, Typography,
} from '@material-ui/core';
import Layout from './Layout';
import {
  useFinalRankings, useHostStatus, usePoll, usePollRef,
} from './data';
import Flag from './Flag';
import TransitionTableRow from './TransitionTableRow';
import ParticipantList from './ParticipantList';

function ResultView({ pollId }) {
  const finalResults = useFinalRankings(pollId);
  const [isHost] = useHostStatus();
  const pollRef = usePollRef(pollId);
  const poll = usePoll(pollId);
  const resultCount = finalResults ? finalResults.length : 0;
  const revealCount = poll && poll.revealCount;
  const onRevealNext = async () => {
    await pollRef.set({
      ...poll,
      revealCount: revealCount == null ? 0 : revealCount + 1,
    });
  };
  const onHidePrevious = async () => {
    await pollRef.set({
      ...poll,
      revealCount: revealCount > 0 ? revealCount - 1 : null,
    });
  };
  let controls;
  if (isHost) {
    controls = (
      <Box mt={3}>
        <FormGroup row>
          <Button
            variant="contained"
            color={revealCount == null ? 'primary' : 'secondary'}
            onClick={onRevealNext}
            disabled={revealCount >= resultCount}
          >
            {revealCount == null ? '"Stop voting now!"' : 'Reveal next result'}
          </Button>
          {revealCount == null ? null : (
            <Button
              variant="outlined"
              color="default"
              onClick={onHidePrevious}
            >
              {revealCount === 0 ? 'Resume voting' : 'Hide previous result'}
            </Button>
          )}
        </FormGroup>
      </Box>
    );
  }
  const countdown = resultCount - revealCount;
  const table = !finalResults ? null : (
    <Box mt={3}>
      <Table>
        <TableBody>
          {finalResults.map(({ country, score }, index) => (
            <TransitionTableRow
              key={country.id}
              in={index >= countdown}
            >
              <TableCell component="th" scope="row">
                {`${index + 1}. `}
                <Flag country={country} />
                {country.name}
              </TableCell>
              <TableCell align="right">
                {score}
              </TableCell>
            </TransitionTableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
  const participantList = revealCount != null ? null : (
    <>
      <Typography variant="h6">Participants</Typography>
      <ParticipantList pollId={pollId} />
    </>
  );
  return (
    <Layout
      title="Results"
      description={
        revealCount == null
          ? 'Waiting for other participants…'
          : 'The host will reveal the results below!'
      }
    >
      {controls}
      {table}
      {participantList}
    </Layout>
  );
}

ResultView.propTypes = {
  pollId: PropTypes.string.isRequired,
};

export default ResultView;
