import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Layout from './Layout';
import { useFinalRankings } from './data';
import Flag from './Flag';
import TransitionTableRow from './TransitionTableRow';

function ResultView({ pollId }) {
  const finalResults = useFinalRankings(pollId);
  const [displayIndex, setDisplayIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayIndex((index) => index + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  const countdown = finalResults ? finalResults.length - displayIndex : 0;
  const table = !finalResults ? null : (
    <Table>
      <TableBody>
        {finalResults.map(({ country, score }, index) => (
          <TransitionTableRow
            key={country.id}
            in={index >= countdown}
          >
            <TableCell component="th" scope="row">
              <Flag country={country} />
              {country.name}
            </TableCell>
            <TableCell align="right">
              {score}
            </TableCell>
          </TransitionTableRow>
        ))}
      </TableBody>
    </Table>
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
