import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button, FormControl, InputLabel, FormHelperText, Box, Paper, FormGroup, Select, Typography,
} from '@material-ui/core';
import Layout from './Layout';
import CountryList from './CountryList';
import ScrollToTop from './ScrollToTop';

let idCounter = 0;

function GroupView({
  pollId, participantId,
  title, description, countries, points, votes, onVotesChange, onSubmit,
}) {
  // eslint-disable-next-line no-plusplus
  const [uniqueId] = useState(() => idCounter++);
  const onVoteChange = (index, country) => {
    const newVotes = votes.map((vote) => (vote === country ? null : vote));
    newVotes[index] = country;
    onVotesChange(newVotes);
  };
  const isSubmitDisabled = points.some((_, index) => !votes[index]);
  return (
    <Layout
      title={title}
      description={description}
    >
      <ScrollToTop key={title} />
      <Paper>
        <CountryList pollId={pollId} participantId={participantId} countries={countries} />
      </Paper>
      <Box my={2}>
        <Typography variant="h6">Your votes</Typography>
      </Box>
      <Box my={2}>
        {points.map((score, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Box key={index} my={2}>
            <FormGroup>
              <FormControl variant="filled">
                <InputLabel htmlFor={`vote-${uniqueId}-${index}`}>
                  {`${index + 1}th favorite`}
                </InputLabel>
                <Select
                  native
                  value={votes[index] || ''}
                  onChange={(event) => onVoteChange(index, event.currentTarget.value)}
                  inputProps={{
                    id: `vote-${uniqueId}-${index}`,
                  }}
                >
                  {votes[index] ? null : (<option aria-label="None" value="" />)}
                  {countries.map((country) => (
                    <option key={country.id} value={country.id}>{country.name}</option>
                  ))}
                </Select>
                <FormHelperText>{`${score} points`}</FormHelperText>
              </FormControl>
            </FormGroup>
          </Box>
        ))}
      </Box>
      <Box mt={2} mb={4}>
        <FormGroup>
          <Button
            type="button"
            onClick={onSubmit}
            disabled={isSubmitDisabled}
            variant="contained"
            color="primary"
          >
            I&apos;m ready
          </Button>
        </FormGroup>
      </Box>
    </Layout>
  );
}

GroupView.propTypes = {
  pollId: PropTypes.string.isRequired,
  participantId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  countries: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  points: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  votes: PropTypes.arrayOf(PropTypes.string).isRequired,
  onVotesChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default GroupView;
