import React from 'react';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Login from './containers/auth/Login';
import Dashboard from './containers/dashboard/Dashboard';
import SpotifyAuthComponent from "./containers/auth/SpotifyAuth.tsx";
import CallbackPage from "./containers/auth/CallbackAuth.tsx";
import PlaylistsManagement from "./containers/playlists-management/PlaylistsManagement.tsx";

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/playlists-management" element={<PlaylistsManagement/>}/>
                <Route path="/check/spotify" element={<SpotifyAuthComponent clientId={'a113eb2f3579419dbcacfc2d1c82fed0'}/>}/>
                <Route path="/callback" element={<CallbackPage/>}/>
            </Routes>
        </Router>
    );
};

export default App;
