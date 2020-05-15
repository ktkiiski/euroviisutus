import React from 'react';
import PropTypes from 'prop-types';
import { Container, Typography, Box } from '@material-ui/core';

function Layout({ title, description, children }) {
  return (
    <Container maxWidth="sm">
      <Typography variant="h2">{title}</Typography>
      <Box my={3}>
        <Typography variant="body1">{description}</Typography>
      </Box>
      <Box>
        {children}
      </Box>
    </Container>
  );
}

Layout.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  children: PropTypes.node,
};

Layout.defaultProps = {
  children: null,
};

export default Layout;
