import React from 'react';
import PropTypes from 'prop-types';
import { Container, Typography } from '@material-ui/core';

function Layout({ title, description, children }) {
  return (
    <Container maxWidth="sm">
      <div>
        <Typography variant="h2">{title}</Typography>
        <Typography variant="body1">{description}</Typography>
      </div>
      <div>
        {children}
      </div>
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
