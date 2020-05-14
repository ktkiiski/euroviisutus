import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, TableRow } from '@material-ui/core';
import { CSSTransition } from 'react-transition-group';

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

function TransitionTableRow({ in: visible, children, ...props }) {
  const styles = useStyles();
  return (
    <CSSTransition
      classNames={{
        enter: styles.enter,
        enterActive: styles.enterActive,
      }}
      in={visible}
      timeout={transitionDuration}
      mountOnEnter
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      <TableRow className={styles.row}>
        {children}
      </TableRow>
    </CSSTransition>
  );
}

TransitionTableRow.propTypes = {
  in: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default TransitionTableRow;
