import React from 'react';
import PropTypes from 'prop-types';
import {
  List, ListItem, ListItemIcon, ListItemText,
} from '@material-ui/core';
import Flag from './Flag';

function CountryList({ countries }) {
  return (
    <List dense>
      {countries.map((country) => (
        <ListItem button key={country.id} component="a" href={country.videoUrl} target="eurovision_song">
          <ListItemIcon>
            <Flag country={country} />
          </ListItemIcon>
          <ListItemText
            primary={country.name}
            secondary={country.song}
          />
        </ListItem>
      ))}
    </List>
  );
}

CountryList.propTypes = {
  countries: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    song: PropTypes.string.isRequired,
    videoUrl: PropTypes.string.isRequired,
  }).isRequired).isRequired,
};

export default CountryList;
