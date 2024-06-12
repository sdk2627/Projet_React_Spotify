import React from 'react';
import {Card} from 'antd';
import {InputProps} from 'antd/lib/input';
import Meta from "antd/es/card/Meta";

interface MyInputProps extends InputProps {
    image?: string;
	images?: { url: string }[],
    title?: string;
    description?: string;
    popularity?: string;
    trackNumber?: string;
}


const CardComponent: React.FC<MyInputProps> = ({
                                                   image,
                                                   title,
                                                   description,
                                                   popularity,
                                                   trackNumber,
                                                   images,
                                               }) => {
    const coverImage = images && images.length > 0 ? images[0].url : image;
    return (
        <Card
            hoverable
            style={{
                width: 240,
                marginRight: 20,
                marginBottom: 30,
                boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)'
            }}
            cover={
                <img alt={title} src={coverImage} style={{width: '240px',height: '240px'}}/>
            }
        >
            {description ? <Meta title={title} description={"Followers: " + description} avatar={popularity}/> : <Meta title={title} description={trackNumber + " titres" } avatar={popularity}/>}
        </Card>
    );
};

Card.defaultProps = {};

export default CardComponent;
