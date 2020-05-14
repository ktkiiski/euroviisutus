import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { CSSTransition } from 'react-transition-group';
import { makeStyles } from '@material-ui/core';
import Layout from './Layout';
import { useFinalRankings } from './data';
import Flag from './Flag';

const transitionDuration = 700;
const useStyles = makeStyles((theme) => ({
  row: {
    backgroundColor: theme.palette.background.paper,
  },
  enter: {
    opacity: 0,
    transform: 'translateX(-100%)',
  },
  enterActive: {
    opacity: 1,
    transform: 'translateX(0%)',
    transition: `opacity ${transitionDuration}ms ease-out, transform ${transitionDuration}ms ease-out`,
  },
}));

function ResultView({ pollId }) {
  const styles = useStyles();
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
    <Table aria-label="simple table">
      <TableBody>
        {finalResults.map(({ country, score }, index) => (
          <CSSTransition
            key={country.id}
            classNames={{
              enter: styles.enter,
              enterActive: styles.enterActive,
            }}
            in={index >= countdown}
            timeout={transitionDuration}
            mountOnEnter
          >
            <TableRow className={styles.row}>
              <TableCell component="th" scope="row">
                <Flag country={country} />
                {country.name}
              </TableCell>
              <TableCell align="right">
                {score}
              </TableCell>
            </TableRow>
          </CSSTransition>
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
