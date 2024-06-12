import React,{Dispatch,SetStateAction,useState} from "react";
import {Checkbox,Input,Layout,Modal} from "antd";
import {Playlist} from "../../utils/interface.ts";
import Button from "../UI/Button.tsx";

interface ModalCompoProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    playlist: Playlist;
}

const ModalPlaylistInfo: React.FC<ModalCompoProps> = ({playlist,open,setOpen}) => {

    const onClose = () => {
        setOpen(false);
    }

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };
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
                title={playlist.name}
                onCancel={handleCancel}
                width={"800px"}
                footer={[]}
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

                <Button
                    onClick={onClose}
                    bgcolor={"#438539"}
                    fontColor={"black"}
                    marginT={"20px"}
                    widthB={"100%"}
                >
                    Sauvegarder les modifications
                </Button>
            </Modal>
        </Layout>
    );
}

export default ModalPlaylistInfo;
