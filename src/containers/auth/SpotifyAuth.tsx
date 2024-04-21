import React from 'react';
import 'react-spotify-auth/dist/index.css';

interface SpotifyAuthProps {
	clientId: string;
}

const SpotifyAuthComponent: React.FC<SpotifyAuthProps> = ({clientId}) => {
	// const navigate = useNavigate();
	const CLIENT_ID = clientId;
	const REDIRECT_URI = "http://localhost:5173/callback";
	const scopes = [
		'user-read-private',
		'user-read-playback-state',
		'user-read-email',
		'user-follow-read',
		'user-modify-playback-state',
		'playlist-read-collaborative',
		'playlist-read-private',
	].join('%20');
	const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&&scope=${scopes}`;

	return window.location.href = AUTH_URL;
};

export default SpotifyAuthComponent;
