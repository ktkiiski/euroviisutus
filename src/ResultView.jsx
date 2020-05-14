import React from 'react';
// import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import Layout from './Layout';

function ResultView() {
  return (
    <Layout
      title="Results"
      description="Waiting for other participants…"
    >
      <Typography variant="body1">TODO</Typography>
    </Layout>
  );
}

ResultView.propTypes = {
};

export default ResultView;
