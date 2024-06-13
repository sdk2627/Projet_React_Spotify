import React, { useEffect, useState } from "react";
import HeaderComponent from "../../components/UI/Header.tsx";
import './PlaylistsManagement.css';
import PlaylistCard from "../../components/UI/PlaylistCard.tsx";
import { Playlist } from "../../utils/interface.ts";

const PlaylistsManagement: React.FC = () => {
    const token = window.localStorage.getItem('access_token');
    const [playlists, setPlaylists] = useState<Playlist[]>([]);

    const fetchData = async () => {
        try {
            const playlistsResponse = await fetch('https://api.spotify.com/v1/me/playlists', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!playlistsResponse.ok) throw new Error('Failed to fetch playlists');
            const playlistsData = await playlistsResponse.json();

            setPlaylists(playlistsData.items);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (!token) return;
        fetchData();
    }, [token]);

    const updatePlaylist = async (playlistName: string, playlistDescription: string, playlistIsPublic: boolean, playlistId: string) => {
        console.log(playlistName,playlistDescription,playlistIsPublic,playlistId)
        try {
            const updateResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: playlistName,
                    description: playlistDescription,
                    public: playlistIsPublic
                })
            });

            if (!updateResponse.ok) throw new Error('Failed to update playlist');
            setTimeout(() => {
                // After updating the playlist, fetch the updated data
                fetchData();
            },4000);

            // After updating the playlist, directly update the state
            setPlaylists(prevPlaylists =>
              prevPlaylists.map(playlist =>
                playlist.id === playlistId
                  ? { ...playlist, name: playlistName, description: playlistDescription, public: playlistIsPublic }
                  : playlist
              )
            );

        } catch (error) {
            console.error(error);
        }
    }

    return (
      <>
          <title>SpotiFlow • Playlists Management</title>

          <div>
              <HeaderComponent />
              <div className={'playlists-wrapper'}>
                  <div className={'playlists-grid'}>
                      <div>
                          <h1 className={'title'}>Playlists</h1>
                          <h3>Nombre de playlists : {playlists.length}</h3>
                      </div>
                      {playlists.map((playlist, index) => (
                        <PlaylistCard
                          key={index}
                          playlist={playlist}
                          updatePlaylistEvent={updatePlaylist}
                        />
                      ))}
                  </div>
              </div>
          </div>
      </>
    );
}

export default PlaylistsManagement;