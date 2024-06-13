import React, { useEffect, useState } from "react";
import HeaderComponent from "../../components/UI/Header";
import { Input, message, Space } from "antd";
import ContentComponent from "../../components/UI/Content";
import CardComponent from "../../components/UI/Card";
import CardMusic from "../../components/UI/CardMusic";
import { LuUser } from "react-icons/lu";
import { IoIosMusicalNotes } from "react-icons/io";
import { AiOutlineLine } from "react-icons/ai";

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
	const [searchQuery, setSearchQuery] = useState('');
	const [device, setDevice] = useState<Device>();
	const [isPlaying, setIsPlaying] = useState(false);
	const token = window.localStorage.getItem('access_token');
	const devicesString = window.localStorage.getItem('devices');
	const devices = devicesString ? JSON.parse(devicesString) : [];

	useEffect(() => {
		if (!token) return;

		const fetchData = async () => {
			try {
				const userResponse = await fetch('https://api.spotify.com/v1/me', {
					headers: { 'Authorization': `Bearer ${token}` }
				});
				if (!userResponse.ok) throw new Error('Failed to fetch user data');
				const userData = await userResponse.json();

				const { display_name, email, country, product } = userData;
				const [firstName, ...lastNameParts] = display_name.split(' ');
				const lastName = lastNameParts.join(' ');

				window.localStorage.setItem('firstname', firstName);
				window.localStorage.setItem('lastname', lastName);
				window.localStorage.setItem('email', email);
				window.localStorage.setItem('country', country);
				window.localStorage.setItem('product', product);
				window.localStorage.setItem('device', device?.name as string);

				const artistsResponse = await fetch('https://api.spotify.com/v1/me/following?type=artist&limit=50', {
					headers: { 'Authorization': `Bearer ${token}` }
				});
				if (!artistsResponse.ok) throw new Error('Failed to fetch artists');
				const artistsData = await artistsResponse.json();

				setArtists(artistsData.artists.items);

				const devicesResponse = await fetch('https://api.spotify.com/v1/me/player/devices', {
					headers: { 'Authorization': `Bearer ${token}` }
				});
				if (!devicesResponse.ok) throw new Error('Failed to fetch devices');
				const devicesData = await devicesResponse.json();
				window.localStorage.setItem('devices', JSON.stringify(devicesData.devices));
				setDevice(devicesData.devices[0])
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, []);

	useEffect(() => {
		if (!searchQuery) return;
		const query = encodeURIComponent(searchQuery);

		const fetchTrack = async () => {
			try {
				const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=1`, {
					headers: { 'Authorization': `Bearer ${token}` }
				});
				if (!response.ok) throw new Error('Failed to fetch track');
				const data = await response.json();
				setArtist(data.tracks.items[0] || null);
			} catch (error) {
				console.error('Failed to fetch track:', error);
			}
		};

		fetchTrack();
	}, [searchQuery]);
	const getDeviceId = () => devices.length > 0 ? devices[0].id : null;
	const deviceId = getDeviceId();
	const playMusic = async () => {
		if (!token || devices.length === 0) {
			message.error('Aucun device trouvé, veuillez démarrer un track sur votre compte Spotify');
			return;
		}

		const uris = [artist?.uri];
		try {
			const response = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
				method: 'PUT',
				headers: {
					'Authorization': `Bearer ${token}`,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ uris, position_ms: 0 })
			});

			if (!response.ok) {
				throw new Error('Playback request failed');
			}
			console.log("Music playback started successfully.");
			setIsPlaying(true);
		} catch (error) {
			console.error("Error in music playback:", error);
		}
	};

	const pauseMusic = async () => {
		if (!token || devices.length === 0) {
			message.error('Aucun device trouvé, veuillez démarrer un track sur votre compte Spotify');
			return;
		}

		try {
			const response = await fetch(`https://api.spotify.com/v1/me/player/pause`, {
				method: 'PUT',
				headers: {
					'Authorization': `Bearer ${token}`,
					'Content-Type': 'application/json'
				}
			});

			if (!response.ok) {
				throw new Error('Pause request failed');
			}
			console.log("Music playback paused successfully.");
			setIsPlaying(false);
		} catch (error) {
			console.error("Error in pausing music playback:", error);
		}
	};

	const playPreviousTrack = async () => {
		const token = window.localStorage.getItem('access_token');
		try {
			const response = await fetch(`https://api.spotify.com/v1/me/player/previous?device_id=${deviceId}`, {
				method: 'POST',
				headers: {
					'Authorization': `Bearer ${token}`,
					'Content-Type': 'application/json'
				},
			});

			console.log("Previous track played successfully.", response);

			if (!response.ok) {
				throw new Error('Failed to skip to previous track');
			}

		} catch (error) {
			console.error("Error skipping to previous track:", error);
		}
	};

	const playNextTrack = async () => {
		const token = window.localStorage.getItem('access_token');
		try {
			const response = await fetch(`https://api.spotify.com/v1/me/player/next?device_id=${deviceId}`, {
				method: 'POST',
				headers: {
					'Authorization': `Bearer ${token}`,
					'Content-Type': 'application/json'
				},
			});
			console.log("Next track played successfully.", response);

			if (!response.ok) {
				throw new Error('Failed to skip to next track');
			}

		} catch (error) {
			console.error("Error skipping to next track:", error);
		}
	};

	useEffect(() => {
		if (searchQuery) {
			const query = encodeURIComponent(searchQuery);

			fetch(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=1`, {
				method: 'GET',
				headers: {
					'Authorization': `Bearer ${token}`
				}
			})
			.then(response => response.json())
			.then(data => {
				if (data.tracks.items.length > 0) {
					setArtist(data.tracks.items[0]);
				} else {
					console.log("Aucune chanson trouvée pour cette recherche.");
				}
			})
			.catch(error => {
				console.error('Erreur lors de la recherche de la chanson:', error);
			});
		}
	}, [searchQuery]);



	return (
		<><title>SpotiFlow • Dashboard</title>
			<div>
				<HeaderComponent/>
				<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', marginTop: '30px', marginBottom: '25px' }}>
					<div className="searchBarDashboard" style={{ width: '30rem' }}>
						<Input
							size="large"
							placeholder="  Entrez le nom de l'artiste ou de la chanson..."
							prefix={<><LuUser /><AiOutlineLine /><IoIosMusicalNotes /></>}
							value={searchQuery}
							onChange={e => setSearchQuery(e.target.value)}
						/>
					</div>
				</div>
				<Space direction="vertical" size="middle" style={{display: 'flex'}}>
					<div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap' }}>
						<CardMusic
							image={artist?.album.images[0].url}
							title={artist?.name}
							description={artist?.artists[0].name}
							onPlayClick={() => {
								playMusic();
								setIsPlaying(true);
							}}
							 onPauseClick={() => {
								pauseMusic();
								setIsPlaying(false);
							}}
							onNextClick={() => {
								if (isPlaying)
								playNextTrack();
							}}
							onPreviousClick={() => {
								if (isPlaying)
								playPreviousTrack();
							}}
							isPlaying={isPlaying}
						/>
						<CardMusic image={artist?.album.images[0].url} title={artist?.name} description={artist?.artists[0].name}
											 onPlayClick={playMusic} isPlaying={false}/>
					</div>

					<ContentComponent padding={"40px"} margin={"25px 50px 80px 50px"} heigth={"400px"}>
						<h1 style={{margin: "0 auto 50px auto", textAlign: 'center'}}>Listes des abonnements</h1>
						<div style={{
							display: 'grid',
							gridTemplateColumns: 'repeat(auto-fill, minmax(220px,270px))',
							justifyContent: 'center',
							justifyItems: 'center',
							alignItems: 'center',
						}}>
							{artists && artists.map((artist, index) => (
								<div key={index}>
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
