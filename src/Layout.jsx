import React from 'react';
import PropTypes from 'prop-types';
import {
  Container, Typography, Box, makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles({
  coverImage: {
    width: '100%',
    height: 'auto',
  },
});

function Layout({
  title, description, coverImageUrl, children,
}) {
  const styles = useStyles();
  return (
    <>
      {!coverImageUrl ? null : (
        <img className={styles.coverImage} alt={title} src={coverImageUrl} />
      )}
      <Container maxWidth="sm">
        <Box mt={1}>
          <Typography variant="h2">{title}</Typography>
        </Box>
        <Box my={3}>
          <Typography variant="body1">{description}</Typography>
        </Box>
        <Box>
          {children}
        </Box>
      </Container>
    </>
  );
}

Layout.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  coverImageUrl: PropTypes.string,
  children: PropTypes.node,
};

Layout.defaultProps = {
  children: null,
  coverImageUrl: null,
};

export default Layout;
