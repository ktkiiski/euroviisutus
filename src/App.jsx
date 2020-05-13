import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';
import PollView from './PollView';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/poll/:pollId"
          render={({ match }) => <PollView pollId={match.params.pollId} />}
        />
        <Route path="/">
          <h1>Welcome!</h1>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
