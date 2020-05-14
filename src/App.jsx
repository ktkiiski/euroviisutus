import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';
import { Container, Typography } from '@material-ui/core';
import PollView from './PollView';
import JoinView from './JoinView';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/poll/:pollId/join"
          render={({ match }) => <JoinView pollId={match.params.pollId} />}
        />
        <Route
          exact
          path="/poll/:pollId"
          render={({ match }) => <PollView pollId={match.params.pollId} />}
        />
        <Route exact path="/">
          <h1>Welcome!</h1>
        </Route>
        <Route path="*">
          <Container>
            <Typography>Page not found</Typography>
          </Container>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
