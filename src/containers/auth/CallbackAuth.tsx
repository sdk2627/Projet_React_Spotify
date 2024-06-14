import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {Spin} from "antd";

function CallbackPage() {
	const navigate = useNavigate();

	useEffect(() => {
		const hash = window.location.hash;
		let token = window.localStorage.getItem('access_token');
		if (!token && hash) {
			token = hash.substring(1).split('&').find(elem => elem.startsWith('access_token'))?.split('=')[1] || '';
			if (token) {
				window.localStorage.setItem('access_token', token);
				navigate('/dashboard');
			} else {
				navigate('/');
			}
			window.location.hash = '';
		} else {
			if (token) {
				navigate('/dashboard');
			} else {
				navigate('/');
			}
		}
	}, [navigate]);

	return (
		<Spin tip="Redirection... Tic Tac" size="large" fullscreen={true}>
			<div className="content"/>
		</Spin>
	);
}

export default CallbackPage;
