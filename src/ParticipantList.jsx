import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import { TransitionGroup } from 'react-transition-group';
import { makeStyles } from '@material-ui/core';
import { usePollParticipants } from './data';
import TransitionTableRow from './TransitionTableRow';

const useStyles = makeStyles((theme) => ({
  table: {
    marginTop: theme.spacing(2),
  },
}));

function ParticipantList({ pollId }) {
  const styles = useStyles();
  const participants = usePollParticipants(pollId);
  if (!participants) {
    return null;
  }
  return (
    <Table className={styles.table}>
      <TransitionGroup component={TableBody}>
        {participants.map(({ id, name }) => (
          <TransitionTableRow key={id}>
            <TableCell component="th" scope="row">
              {name}
            </TableCell>
          </TransitionTableRow>
        ))}
      </TransitionGroup>
    </Table>
  );
}

ParticipantList.propTypes = {
  pollId: PropTypes.string.isRequired,
};

export default ParticipantList;
