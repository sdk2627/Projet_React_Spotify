import React,{Dispatch,SetStateAction,useState} from "react";
import {Checkbox,Input,Layout,Modal} from "antd";
import {Playlist} from "../../utils/interface.ts";

interface ModalCompoProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    playlist: Playlist;
    onPlaylistAdded: CallableFunction;
}

const ModalPlaylistInfo: React.FC<ModalCompoProps> = ({playlist,open,setOpen, onPlaylistAdded}) => {

    const handleCancel = () => {
        setOpen(false);
    };

    const handleOk = () => {
        onPlaylistAdded(playlistName, playlistDescription, playlistIsPublic, playlist.id);
        setOpen(false);
    }

    const [playlistName, setPlaylistName] = useState(playlist.name || '');
    const [playlistDescription, setPlaylistDescription] = useState(playlist.description || '');
    const [playlistIsPublic, setPlaylistIsPublic] = useState(playlist.public || false);
    return (
        <Layout style={{
            borderRadius: 8,
            overflow: 'hidden',
            width: 'calc(50% - 8px)',
            maxWidth: 'calc(50% - 8px)',
        }}>
            <Modal
                open={open}
                onCancel={handleCancel}
                onOk={handleOk}
                okText={"Modifier"}
                okType={"danger"}
                cancelText={"Annuler"}
                title={playlist.name}
                width={"800px"}
            >

                <Input
                    addonBefore="Nom de la playlist:"
                    value={playlistName}
                    onChange={(e) => setPlaylistName(e.target.value)}
                    style={{marginBottom: "20px",marginTop: "20px"}}
                />
                <Input
                    addonBefore="Description:"
                    value={playlistDescription}
                    onChange={(e) => setPlaylistDescription(e.target.value)}
                    style={{marginBottom: "20px"}}
                />
                <Checkbox
                    checked={playlistIsPublic}
                    onChange={(e) => setPlaylistIsPublic(e.target.checked)}
                >
                    Playlist publique
                </Checkbox>
            </Modal>
        </Layout>
    );
}

export default ModalPlaylistInfo;
