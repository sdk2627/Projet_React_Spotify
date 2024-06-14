import React, { useEffect, useState } from "react";
import HeaderComponent from "../../components/UI/Header.tsx";
import './PlaylistsManagement.css';
import PlaylistCard from "../../components/UI/PlaylistCard.tsx";
import { Playlist } from "../../utils/interface.ts";
import {Input} from "antd";
import {PiPlaylistBold} from "react-icons/pi";

const PlaylistsManagement: React.FC = () => {
    const token = window.localStorage.getItem('access_token');
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const [searchQuery,setSearchQuery] = useState('');
    const [filteredPlaylists, setFilteredPlaylists] = useState<Playlist[]>([]);

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
      /*      setTimeout(() => {*/
                // After updating the playlist, fetch the updated data
      /*          fetchData();*/
      /*      },4000);*/

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

    useEffect(() => {
        if (!searchQuery) {
            fetchData();
            setFilteredPlaylists(playlists);
        } else {
            const filtered = playlists.filter(playlist =>
              playlist.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredPlaylists(filtered);
        }
    }, [searchQuery, playlists]);

    return (
      <>
          <title>SpotiFlow • Playlists Management</title>
          <div>
              <HeaderComponent />
              <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  marginTop: '30px',
                  marginBottom: '25px'
              }}>
                  <div className="searchBarDashboard" style={{ width: '30rem' }}>
                      <Input
                        size="large"
                        placeholder="Entrez le nom de l'artiste ou de la chanson..."
                        prefix={<PiPlaylistBold/>}
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                      />
                  </div>
              </div>
              <div className={'playlists-wrapper'}>
                  <div>
                      <h1 className={'title'}>Playlists</h1>
                      <h3>Nombre de playlists : {filteredPlaylists.length}</h3>
                  </div>
                  <div className={'playlists-grid'}>
                      {filteredPlaylists.map((playlist, index) => (
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
