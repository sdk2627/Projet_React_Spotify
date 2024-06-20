import React, { useState } from 'react';
import { Card, Dropdown, Space } from 'antd';
import { InputProps } from 'antd/lib/input';
import Meta from 'antd/es/card/Meta';
import type { MenuProps } from 'antd';
import { Playlist } from '../../utils/interface.ts';
import ModalPlaylistInfo from '../Modal/ModalPlaylistInfo.tsx';
import ModalPlaylistTracks from '../Modal/ModalPlaylistTracks.tsx';
import {LuExternalLink} from "react-icons/lu";
import {IoIosArrowDropdown} from "react-icons/io";
import {MdEdit} from "react-icons/md";
import {HiViewGrid} from "react-icons/hi";

interface Inputs extends InputProps {
  playlist: Playlist;
  updatePlaylistEvent: CallableFunction;
}

const PlaylistCardComponent: React.FC<Inputs> = ({
                                                   playlist,
                                                   updatePlaylistEvent
                                                 }) => {
  const [isModalUserIOpen, setIsModalUserIOpen] = useState(false);
  const [isModalTracksOpen, setIsModalTracksOpen] = useState(false);

  const handlePlaylistEditClick = () => {
    setIsModalUserIOpen(true);
  };

  const handleTracksViewClick = () => {
    setIsModalTracksOpen(true);
  };

  const items: MenuProps['items'] = [
    {
      label: <div onClick={handleTracksViewClick}><HiViewGrid /> Voir les titres</div>,
      key: '0',
    },
    {
      label: <div onClick={handlePlaylistEditClick}><MdEdit /> Modifier</div>,
      key: '1'
    },
    {
      type: 'divider',
    },
    {
      label: (
        <a
          target={"_blank"}
          href={playlist.external_urls.spotify}
          style={{ color: 'inherit', textDecoration: 'none' }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#1DB954'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'inherit'}
        >
          <LuExternalLink /> Voir la playlist
        </a>
      ),
      key: '2',
    }
  ];

  return (
    <Space wrap>
      <Card
        style={{
          width: 220,
          boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)'
        }}
        cover={playlist.images[0]?.url && <img alt={playlist.name} src={playlist.images[0].url} style={{ width: '220px', height: '220px' }} />}
      >
        {playlist.description ? <Meta title={playlist.name} style={{ whiteSpace: 'nowrap' }} description={playlist.description} /> :
          <Meta title={playlist.name} description={`${playlist.tracks.total} titres`} />}
        <Dropdown menu={{ items }} trigger={['hover']}>
          <a onClick={(e) => e.preventDefault()}>
            <Space style={{paddingTop: "15px"}}>
              <span style={{color: "#1DB954"}}><IoIosArrowDropdown size={24}/></span>
            </Space>
          </a>
        </Dropdown>
      </Card>
      <ModalPlaylistInfo
        playlist={playlist}
        setOpen={setIsModalUserIOpen}
        open={isModalUserIOpen}
        onPlaylistAdded={(playlistName: string, playlistDescription: string, playlistIsPublic: boolean, playlistId: string) => updatePlaylistEvent(playlistName, playlistDescription, playlistIsPublic, playlistId)}
      />
      <ModalPlaylistTracks
        playlist={playlist}
        setOpen={setIsModalTracksOpen}
        open={isModalTracksOpen}
      />
    </Space>
  );
};

Card.defaultProps = {};

export default PlaylistCardComponent;
