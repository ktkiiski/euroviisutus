import React from 'react';
import PropTypes from 'prop-types';
import {
  List, ListItem, ListItemIcon, ListItemText,
} from '@material-ui/core';
import Flag from './Flag';

function CountryList({ countries }) {
  return (
    <List>
      {countries.map((country) => (
        <ListItem button key={country.id}>
          <ListItemIcon>
            <Flag country={country} />
          </ListItemIcon>
          <ListItemText primary={country.name} />
        </ListItem>
      ))}
    </List>
  );
}

CountryList.propTypes = {
  countries: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired).isRequired,
};

export default CountryList;
