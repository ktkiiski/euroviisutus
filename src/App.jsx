import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import PollView from './PollView';
import JoinView from './JoinView';
import Layout from './Layout';
import AdminView from './AdminView';
import coverImageUrl from './eurovision.jpg';

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
          render={({ match }) => (
            <Redirect to={`/poll/${match.params.pollId}/join`} />
          )}
        />
        <Route
          exact
          path="/poll/:pollId/:groupIndex(\d+)"
          render={({ match }) => (
            <PollView
              pollId={match.params.pollId}
              groupIndex={parseInt(match.params.groupIndex, 10)}
            />
          )}
        />
        <Route exact path="/admin">
          <AdminView />
        </Route>
        <Route exact path="/">
          <Layout
            coverImageUrl={coverImageUrl}
            title="Eurovision"
            description="Contact your host and ask them for a link to your Eurovision party!"
          />
        </Route>
        <Route path="*">
          <Layout
            title="Not found"
            description="The page was not found, check your URL."
          />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
