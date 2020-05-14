import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  flag: {
    width: 24,
    height: 24,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    verticalAlign: 'middle',
  },
}));

function Flag({ country }) {
  const styles = useStyles();
  return (
    <img
      className={styles.flag}
      alt={country.name}
      src={`https://www.countryflags.io/${country.id.toLowerCase()}/flat/24.png`}
    />
  );
}

Flag.propTypes = {
  country: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default Flag;
