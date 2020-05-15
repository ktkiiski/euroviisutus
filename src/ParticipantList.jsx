import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import { TransitionGroup } from 'react-transition-group';
import { makeStyles } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import { green } from '@material-ui/core/colors';
import { usePollParticipants } from './data';
import TransitionTableRow from './TransitionTableRow';

const useStyles = makeStyles((theme) => ({
  table: {
    marginTop: theme.spacing(2),
  },
  icon: {
    fontSize: 16,
    color: green[200],
  },
}));

function ParticipantList({ pollId, animate }) {
  const styles = useStyles();
  const participants = usePollParticipants(pollId);
  if (!participants) {
    return null;
  }
  return (
    <Table className={styles.table}>
      <TransitionGroup component={TableBody}>
        {participants.map(({ id, name, isReady }) => (
          <TransitionTableRow key={id} enter={animate}>
            <TableCell component="th" scope="row">
              {name}
            </TableCell>
            <TableCell align="right">
              {isReady ? <Icon className={styles.icon}>check</Icon> : null}
            </TableCell>
          </TransitionTableRow>
        ))}
      </TransitionGroup>
    </Table>
  );
}

ParticipantList.propTypes = {
  pollId: PropTypes.string.isRequired,
  animate: PropTypes.bool,
};

ParticipantList.defaultProps = {
  animate: false,
};

export default ParticipantList;
