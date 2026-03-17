import { Routes, Route, Navigate } from 'react-router-dom';
import ProfileLayout from './components/layout/ProfileLayout';
import Layout from './components/layout/Layout';
import ProfilePage from './pages/ProfilePage';
import CreateEventPage from './pages/CreateEventPage';
import EventPage from './pages/EventPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <Routes>
      {/* Authenticated profile experience */}
      <Route element={<ProfileLayout />}>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/create" element={<CreateEventPage />} />
      </Route>

      {/* Public event page — shareable link for guests */}
      <Route element={<Layout />}>
        <Route path="/event/:id" element={<EventPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* Redirect root to profile */}
      <Route path="/" element={<Navigate to="/profile" replace />} />
    </Routes>
  );
}
