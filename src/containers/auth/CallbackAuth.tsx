import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CallbackPage() {
	const navigate = useNavigate();

	useEffect(() => {
		const hash = window.location.hash;
		let token = window.localStorage.getItem('access_token');

		if (!token && hash) {
			// @ts-ignore
			token = hash.substring(1).split('&').find(elem => elem.startsWith('access_token')).split('=')[1];
			window.location.hash = '';
			window.localStorage.setItem('access_token', token);
		}

		navigate('/dashboard');
	}, [navigate]);

	return <div>Chargement...</div>;
}

export default CallbackPage;
