import React,{useEffect,useState} from "react";
import HeaderComponent from "../../components/UI/Header.tsx";
import CardComponent from "../../components/UI/Card.tsx";
import './PlaylistsManagement.css';

interface Playlist {
    collaborative: boolean;
    description: string;
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: Image[];
    name: string;
    owner: User;
    primary_color: string | null;
    public: boolean;
    snapshot_id: string;
    tracks: Tracks;
    type: string;
    uri: string;
}

interface ExternalUrls {
    spotify: string;
}

interface Image {
    height: number;
    url: string;
    width: number;
}

interface User {
    display_name: string;
    external_urls: ExternalUrls;
    href: string;
    id: string;
    type: string;
    uri: string;
}

interface Tracks {
    href: string;
    total: number;
}


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
                            <CardComponent
                                key={index}
                                images={playlist.images}
                                title={playlist.name}
                                description={playlist.description}
                                trackNumber={playlist.tracks.total}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default PlaylistsManagement;
