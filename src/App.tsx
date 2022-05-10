import { Suspense } from 'react';
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
import PollCreateForm from './polls/PollCreateForm';
import PollView from './polls/PollView';

function PollRoute() {
  const { pollId } = useParams();
  if (!pollId) {
    throw new Error(`Missing poll ID`);
  }
  return <PollView pollId={pollId} />;
}

function HomeRoute() {
  return <PollCreateForm />;
}

function NotFoundRoute() {
  return <div>Page not found</div>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading…</div>}>
        <Routes>
          <Route path="/polls/:pollId" element={<PollRoute />} />
          <Route path="/" element={<HomeRoute />} />
          <Route path="*" element={<NotFoundRoute />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
