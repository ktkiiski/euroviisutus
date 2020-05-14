import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Container, Button, Typography, FormControl, InputLabel, NativeSelect, FormHelperText,
} from '@material-ui/core';

let idCounter = 0;

function GroupView({
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
    <Container maxWidth="sm">
      <div>
        <Typography variant="h2">{title}</Typography>
        <Typography variant="body1">{description}</Typography>
      </div>
      {points.map((score, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={index}>
          <FormControl>
            <InputLabel htmlFor={`vote-${uniqueId}-${index}`}>
              {`${index + 1}th favorite`}
            </InputLabel>
            <NativeSelect
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
            </NativeSelect>
            <FormHelperText>{`${score} points`}</FormHelperText>
          </FormControl>
        </div>
      ))}
      <div>
        <Button type="button" onClick={onSubmit} disabled={isSubmitDisabled}>
          I&apos;m ready
        </Button>
      </div>
    </Container>
  );
}

GroupView.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  countries: PropTypes.arrayOf(PropTypes.exact({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  points: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  votes: PropTypes.arrayOf(PropTypes.string).isRequired,
  onVotesChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default GroupView;
