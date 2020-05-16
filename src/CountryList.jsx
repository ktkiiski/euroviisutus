import React from 'react';
import PropTypes from 'prop-types';
import {
  List, ListItem, ListItemIcon, ListItemText, Divider, ListItemSecondaryAction, Typography,
} from '@material-ui/core';
import Flag from './Flag';
import { groups } from './countries';
import { usePollParticipant, getCountryScore } from './data';

function CountryList({ countries, pollId, participantId }) {
  const participant = usePollParticipant(pollId, participantId);
  return (
    <List dense>
      {countries.map((country, index) => {
        const startsGroup = groups.find((group) => group.countries[0].id === country.id);
        const score = getCountryScore(participant ? [participant] : [], country.id);
        return (
          <React.Fragment key={country.id}>
            {!index || !startsGroup ? null : <Divider />}
            <ListItem button component="a" href={country.videoUrl} target="eurovision_song">
              <ListItemIcon>
                <Flag country={country} />
              </ListItemIcon>
              <ListItemText
                primary={country.name}
                secondary={country.song}
              />
              {!score ? null : (
                <ListItemSecondaryAction>
                  <Typography>{score}</Typography>
                </ListItemSecondaryAction>
              )}
            </ListItem>
          </React.Fragment>
        );
      })}
    </List>
  );
}

CountryList.propTypes = {
  pollId: PropTypes.string,
  participantId: PropTypes.string,
  countries: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    song: PropTypes.string.isRequired,
    videoUrl: PropTypes.string.isRequired,
  }).isRequired).isRequired,
};

CountryList.defaultProps = {
  pollId: null,
  participantId: null,
};

export default CountryList;
