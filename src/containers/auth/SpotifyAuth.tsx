import React from 'react';
import 'react-spotify-auth/dist/index.css';

interface SpotifyAuthProps {
	clientId: string;
}

const SpotifyAuthComponent: React.FC<SpotifyAuthProps> = ({clientId}) => {
	// const navigate = useNavigate();
	const CLIENT_ID = clientId;
	const REDIRECT_URI = "http://localhost:5173/callback";
	const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=user-read-private%20user-read-email`;

	return window.location.href = AUTH_URL;
};

export default SpotifyAuthComponent;
