import React from 'react';
import 'react-spotify-auth/dist/index.css';
import {Spin} from "antd";

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
		'playlist-modify-public',
		'playlist-modify-private',

	].join('%20');
	window.location.href = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&&scope=${scopes}`;
	return (
		<Spin tip="Chargement..." size="large" fullscreen={true}/>
	)
};

export default SpotifyAuthComponent;
