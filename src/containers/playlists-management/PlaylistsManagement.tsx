import React,{useEffect} from "react";
import HeaderComponent from "../../components/UI/Header.tsx";

const PlaylistsManagement : React.FC = () => {

    useEffect(() => {
        const token = window.localStorage.getItem('access_token');
        if (token) {
            fetch('https://api.spotify.com/v1/me',{
                headers: {}
            });
        }
    });
    return (
            <>
                <div>
                    <HeaderComponent/>
                </div>
            </>
    );
}

 export default PlaylistsManagement;
