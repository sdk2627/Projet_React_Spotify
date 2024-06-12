import React,{useEffect,useState} from "react";
import HeaderComponent from "../../components/UI/Header.tsx";
import './PlaylistsManagement.css';
import PlaylistCard from "../../components/UI/PlaylistCard.tsx";
import {Playlist} from "../../utils/interface.ts";




const PlaylistsManagement: React.FC = () => {
    const token = window.localStorage.getItem('access_token');
    const [playlists,setPlaylists] = useState<Playlist[]>([]);
    useEffect(() => {
        if (!token) return;

        const fetchData = async () => {
            try {
                const playlistsResponse = await fetch('https://api.spotify.com/v1/me/playlists',{
                    headers: {'Authorization': `Bearer ${token}`}
                });
                if (!playlistsResponse.ok) throw new Error('Failed to fetch artists');
                const playlistsData = await playlistsResponse.json();

                setPlaylists(playlistsData.items);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    },[token]);
    return (
        <><title>SpotiFlow • Playlists Management</title>

            <div>
                <HeaderComponent/>
                <div className={'playlists-wrapper'}>
                    <div className={'playlists-grid'}>
                        <div>
                            <h1 className={'title'}>Playlists</h1>
                            <h3>Nombre de playlists : {playlists.length}</h3>
                        </div>
                        {playlists.map((playlist,index) => (
                            <PlaylistCard
                                key={index}
                                playlist={playlist}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default PlaylistsManagement;
