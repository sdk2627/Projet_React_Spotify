import React, {useEffect, useState} from 'react';
import {Modal, List, Avatar} from 'antd';
import {Playlist} from '../../utils/interface.ts';
import {MdDelete} from 'react-icons/md';

interface ModalPlaylistTracksProps {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	playlist: Playlist;
}

const ModalPlaylistTracks: React.FC<ModalPlaylistTracksProps> = ({open, setOpen, playlist}) => {
	const [tracks, setTracks] = useState<any[]>([]);
	const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
	const [trackToDelete, setTrackToDelete] = useState<any>(null);

	useEffect(() => {
		if (playlist.id) {
			fetchTracks();
		}
	}, [playlist]);

	const fetchTracks = async () => {
		const token = window.localStorage.getItem('access_token');
		try {
			const tracksResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks`, {
				headers: {'Authorization': `Bearer ${token}`}
			});
			if (!tracksResponse.ok) throw new Error('Failed to fetch tracks');
			const tracksData = await tracksResponse.json();
			setTracks(tracksData.items);
		} catch (error) {
			console.error(error);
		}
	};

	const handleCancel = () => {
		setOpen(false);
	};

	const handleDeleteClick = (track: any) => {
		setTrackToDelete(track);
		setIsConfirmModalOpen(true);
	};

	const handleConfirmDelete = async () => {
		if (trackToDelete) {
			const token = window.localStorage.getItem('access_token');
			try {
				const response = await fetch(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks`, {
					method: 'DELETE',
					headers: {
						'Authorization': `Bearer ${token}`,
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						tracks: [{uri: trackToDelete.track.uri}]
					})
				});
				if (!response.ok) throw new Error('Failed to delete track');

				fetchTracks();
				setIsConfirmModalOpen(false);
				setTrackToDelete(null);
			} catch (error) {
				console.error(error);
			}
		}
	};

	return (
		<>
			<Modal
				open={open}
				onCancel={handleCancel}
				title={`Titres de la playlist ${playlist.name}`}
				width={800}
				maskClosable={false}
				footer={null}
			>
				<List
					pagination={{
						pageSize: 8,
					}}
					dataSource={tracks}
					renderItem={(item) => (
						<List.Item
							actions={[
								<MdDelete
									style={{color: 'red', cursor: 'pointer'}}
									size={18}
									onClick={() => handleDeleteClick(item)}
								/>
							]}
						>
							<List.Item.Meta
								avatar={<Avatar src={item.track.album.images[0]?.url}/>}
								title={<a href={item.track.external_urls.spotify}>{item.track.name}</a>}
								description={item.track.artists.map((artist: any) => artist.name).join(', ')}
							/>
						</List.Item>
					)}
				/>
			</Modal>
			<Modal
				open={isConfirmModalOpen}
				onCancel={() => setIsConfirmModalOpen(false)}
				onOk={handleConfirmDelete}
				title="Confirmer la suppression"
				okText="Supprimer"
				okType={'danger'}
				cancelText="Annuler"
			>
				<p>Êtes-vous sûr de vouloir supprimer le titre <strong>{trackToDelete?.track.name}</strong> de la playlist ?</p>
			</Modal>
		</>
	);
}

export default ModalPlaylistTracks;
