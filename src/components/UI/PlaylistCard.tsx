import React from 'react';
import {Card,Dropdown, Space} from 'antd';
import {InputProps} from 'antd/lib/input';
import Meta from "antd/es/card/Meta";
import type { MenuProps } from 'antd';

interface MyInputProps extends InputProps {
    images?: { url: string }[],
    title?: string;
    description?: string;
    trackNumber?: number;
}

const items: MenuProps['items'] = [
    {
        label: <div>Voir</div>,
        key: '0',
    },
    {
        type: 'divider',
    },
    {
        label: <div>Modifier</div>,
        key: '1',
    },
    {
        type: 'divider',
    },
    {
        label: <div>Supprimer</div>,
        key: '3',
    },
];

const PlaylistCardComponent: React.FC<MyInputProps> = ({
                                                   title,
                                                   description,
                                                   trackNumber,
                                                   images,
                                               }) => {
    const coverImage = images && images.length > 0 ? images[0].url : '';
    return (
        <Card
            style={{
                width: 200,
                boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)'
            }}
            cover={ coverImage &&
                <img alt={title} src={coverImage} style={{width: '200px',height: '200px'}}/>
            }
        >
            {description ? <Meta title={title} description={"Description: " + description}/> : <Meta title={title} description={trackNumber + " titres" } />}
            <Dropdown menu={{ items }} trigger={['click']}>
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        <span>...</span>
                    </Space>
                </a>
            </Dropdown>
        </Card>
    );
};

Card.defaultProps = {};

export default PlaylistCardComponent;
