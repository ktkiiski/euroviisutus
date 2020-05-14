import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Layout from './Layout';
import { useFinalRankings } from './data';
import Flag from './Flag';

function ResultView({ pollId }) {
  const finalResults = useFinalRankings(pollId);
  const table = !finalResults ? null : (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableBody>
          {finalResults.map(({ country, score }) => (
            <TableRow key={country.id}>
              <TableCell component="th" scope="row">
                <Flag country={country} />
                {country.name}
              </TableCell>
              <TableCell align="right">
                {score}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
  return (
    <Layout
      title="Results"
      description="Waiting for other participants…"
    >
      {table}
    </Layout>
  );
}

ResultView.propTypes = {
  pollId: PropTypes.string.isRequired,
};

export default ResultView;
