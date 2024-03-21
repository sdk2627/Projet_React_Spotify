import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './containers/auth/Login';
import Dashboard from './containers/dashboard/Dashboard';
import SpotifyAuthComponent from "./containers/auth/SpotifyAuth.tsx";
import CallbackPage from "./containers/auth/CallbackAuth.tsx";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/check/spotify" element={<SpotifyAuthComponent clientId={'5da7041161fb4f47ba1a17cbcad28e8b'}/>} />
        <Route path="/callback" element={<CallbackPage />} />
      </Routes>
    </Router>
  );
};

export default App;
