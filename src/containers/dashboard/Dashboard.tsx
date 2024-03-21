import React, {useEffect, useState} from "react";
import HeaderComponent from "../../components/UI/Header";
import {Space} from "antd";
import ContentComponent from "../../components/UI/Content";
import CardComponent from "../../components/UI/Card.tsx";
import CardMusic from "../../components/UI/CardMusic.tsx";

interface Artists {
	images: { url: string }[];
	name: string;
	followers: { total: number };
	popularity: number;
}

interface Artist {
	uri: string;
	album: {
		images: { url: string }[];
	};
	name: string;
	artists: { name: string }[];
}

interface Device {
	id: string;
	is_active: boolean;
	is_private_session: boolean;
	is_restricted: boolean;
	name: string;
	type: string;
	volume_percent: number;
}

const Dashboard: React.FC = () => {
	const [artists, setArtists] = useState<Artists[]>([]);
	const [artist, setArtist] = useState<Artist>();
	const [device, setDevice] = useState<Device>();

	useEffect(() => {
		const token = window.localStorage.getItem('access_token');
		if (token) {
			fetch('https://api.spotify.com/v1/me', {
				headers: {
					'Authorization': `Bearer ${token}`
				}
			})
			.then(response => {
				if (response.ok) {
					return response.json();
				}
				throw new Error('La requête a échoué');
			})
			.then(data => {

				const displayName = data.display_name;
				const names = displayName.split(' ');
				const firstName = names[0];
				let lastName = names.slice(1).join(' ');
				const email = data.email;
				const country = data.country;
				const product = data.product;

				window.localStorage.setItem('firstname', firstName);
				window.localStorage.setItem('lastname', lastName)
				window.localStorage.setItem('email', email);
				window.localStorage.setItem('country', country);
				window.localStorage.setItem('product', product);
			})
			.catch(error => {
				console.error(error);
			});
		}
	}, []);

	useEffect(() => {
		const token = window.localStorage.getItem('access_token');
		if (token) {
			fetch('https://api.spotify.com/v1/me/following?type=artist', {
				headers: {
					'Authorization': `Bearer ${token}`
				}
			})
			.then(response => {
				if (response.ok) {
					return response.json();
				}
				throw new Error('La requête a échoué');
			})
			.then(data => {
				setArtists(data.artists.items);
			})
			.catch(error => {
				console.error(error);
			});
		}
	}, []);

	useEffect(() => {
		const token = window.localStorage.getItem('access_token');
		if (token) {
			fetch('https://api.spotify.com/v1/me/player/devices', {
				headers: {
					'Authorization': `Bearer ${token}`
				}
			})
			.then(response => response.json())
			.then(data => {
				window.localStorage.setItem('devices', JSON.stringify(data.devices));
			})
			.catch(error => console.error("Erreur lors de la récupération des devices:", error));
		}
	}, []);

	const playMusic = async () => {
		const token = window.localStorage.getItem('access_token');
		const uris = [artist?.uri];
		const devicesString = window.localStorage.getItem('devices');

		if (devicesString) {
			const devices = JSON.parse(devicesString);
			if (devices.length > 0) {
				setDevice(devices[0]);
				try {
					const response = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${devices[1].id}`, {
						method: 'PUT',
						headers: {
							'Authorization': `Bearer ${token}`,
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							uris: uris,
							position_ms: 0
						})
					});

					if (response.ok) {
						console.log("Music playback started successfully.");
					} else {
						throw new Error('Playback request failed');
					}
				} catch (error) {
					console.error("Error in music playback:", error);
				}
			} else {
				console.log("Aucun device trouvé dans localStorage.");
			}
		}
	};

	const pauseMusic = async () => {
		const token = window.localStorage.getItem('access_token');
		const devicesString = window.localStorage.getItem('devices');

		if (devicesString) {
			const devices = JSON.parse(devicesString);
			if (devices.length > 0) {
				try {
					const response = await fetch(`https://api.spotify.com/v1/me/player/pause`, {
						method: 'PUT',
						headers: {
							'Authorization': `Bearer ${token}`,
							'Content-Type': 'application/json'
						}
					});

					if (response.ok) {
						console.log("Music playback paused successfully.");
					} else {
						throw new Error('Pause request failed');
					}
				} catch (error) {
					console.error("Error in pausing music playback:", error);
				}
			} else {
				console.log("Aucun device trouvé dans localStorage.");
			}
		}
	};


	useEffect(() => {
		const token = window.localStorage.getItem('access_token');
		const query = encodeURIComponent('La vie qu\'on mène Ninho');

		fetch(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=1`, {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${token}`
			}
		})
		.then(response => response.json())
		.then(data => {
			setArtist(data.tracks.items[0]);
			console.log(data);
		})
		.catch(error => {
			console.error('Erreur lors de la recherche de la chanson:', error);
		});
	}, []);


	return (
		<><title>Dashboard</title>
			<div>
				<HeaderComponent/>
				<Space direction="vertical" size="middle" style={{display: 'flex'}}>
					<div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
						<CardMusic image={artist?.album.images[0].url} title={artist?.name} description={artist?.artists[0].name} onPlayClick={playMusic} onPauseClick={pauseMusic}/>
						<CardMusic image={artist?.album.images[0].url} title={artist?.name} description={artist?.artists[0].name} onPlayClick={playMusic}/>
					</div>

					{/*<ContentComponent padding={"40px"} margin={"25px 50px 80px 50px"} heigth={"350px"} width={"350px"}>*/}
					{/*	<h1 style={{margin: "0 auto 50px auto", textAlign: 'center'}}>Statistiques</h1>*/}
					{/*</ContentComponent>*/}
					<ContentComponent padding={"40px"} margin={"25px 50px 80px 50px"} heigth={"400px"}>
						<h1 style={{margin: "0 auto 50px auto", textAlign: 'center'}}>Listes des abonnements</h1>
						<div style={{
							display: 'flex',
							flexWrap: 'wrap',
							justifyItems: 'center',
							justifyContent: 'space-between',
							alignItems: 'flex-start',
							gap: '20px',
						}}>
							{artists && artists.map((artist, index) => (
								<div key={index} style={{width: 'calc(20% - 20px)'}}>
									<CardComponent
										image={artist.images[0]?.url}
										title={artist.name}
										description={artist.followers.total.toString()}
										popularity={artist.popularity.toString()}
									/>
								</div>
							))}
						</div>
					</ContentComponent>
				</Space>
			</div>
		</>
	);
}

export default Dashboard;
