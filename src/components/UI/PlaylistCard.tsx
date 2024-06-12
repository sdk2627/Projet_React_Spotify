import React,{useState} from 'react';
import {Card,Dropdown,Space} from 'antd';
import {InputProps} from 'antd/lib/input';
import Meta from "antd/es/card/Meta";
import type {MenuProps} from 'antd';
import {Playlist} from "../../utils/interface.ts";
import ModalPlaylistInfo from "../Modal/ModalPlaylistInfo.tsx";

interface Inputs extends InputProps {
   playlist: Playlist;
}

const PlaylistCardComponent: React.FC<Inputs> = ({
                                                           playlist,
                                                       }) => {

    const [isModalUserIOpen, setIsModalUserIOpen] = useState(false);

    const handlePlaylistEditClick = (id: string) => {
        return () => {
            setIsModalUserIOpen(true);
        };
    }

    const items: MenuProps['items'] = [
        {
            label: <div>Ajouter un titre</div>,
            key: '0',
        },
        {
            label: <div>Modifier</div>,
            key: '1',
            onClick: handlePlaylistEditClick(playlist.id || '')
        },
        {
            type: 'divider',
        },
        {
            label: <div>Supprimer</div>,
            key: '3',
        },
    ];

    return (
        <Space wrap>
        <Card
            style={{
                width: 220,
                boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)'
            }}
            cover={playlist.images[0].url &&
                <img alt={playlist.name} src={playlist.images[0].url} style={{width: '220px',height: '220px'}}/>
            }
        >
            {playlist.description ? <Meta title={playlist.name} style={{whiteSpace: 'nowrap'}}
                                 description={playlist.description}/> :
                <Meta title={playlist.name} description={playlist.tracks.total + " titres"}/>}
            <Dropdown menu={{items}} trigger={['click']}>
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        <span>...</span>
                    </Space>
                </a>
            </Dropdown>
        </Card>
            <ModalPlaylistInfo
                playlist={playlist}
                isModalOpen={isModalUserIOpen}
                setIsModalOpen={setIsModalUserIOpen}
                onClose={() => {}}
                open={isModalUserIOpen}
            />
        </Space>
    );
};

Card.defaultProps = {};

export default PlaylistCardComponent;
