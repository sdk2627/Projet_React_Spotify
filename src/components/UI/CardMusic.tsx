import React from 'react';
import {Card,Button} from 'antd';
import {LeftCircleOutlined,PlayCircleOutlined,RightCircleOutlined,PauseCircleOutlined} from '@ant-design/icons';
import Meta from "antd/es/card/Meta";
import defaultImage from "../../assets/a362273509f7eccdcf362bb73b3b006d.avif";

interface MyInputProps {
    image?: string;
    title?: string;
    description?: string;
    onPlayClick?: () => void;
    onPauseClick?: () => void;
    onNextClick?: () => void;
    onPreviousClick?: () => void;
    isPlaying: boolean;
}

const CardMusic: React.FC<MyInputProps> = ({
                                               image,
                                               title,
                                               description,
                                               onPlayClick,
                                               onPauseClick,
                                               onNextClick,
                                               onPreviousClick,
                                               isPlaying,
                                           }) => {
    const handlePlayClick = () => {
        if (isPlaying) {
            onPauseClick && onPauseClick();
        } else {
            onPlayClick && onPlayClick();
        }
    };

    return (
        <Card
            style={{width: 600,height: 360,margin: "40px 50px"}}
            cover={image ? <img src={image} style={{width: '600px',height: '250px'}} alt=""/> : <img src={defaultImage} style={{width: '600px',height: '300px'}} alt=""/>}
            actions={[
                <Button icon={<LeftCircleOutlined/>} onClick={onPreviousClick} disabled={!isPlaying} type="text"/>,
                isPlaying
                    ? <Button icon={<PauseCircleOutlined/>} onClick={handlePlayClick} type="text"/>
                    : <Button icon={<PlayCircleOutlined/>} onClick={handlePlayClick} type="text"/>,
                <Button icon={<RightCircleOutlined/>} onClick={onNextClick} disabled={!isPlaying} type="text"/>
            ]}
        >
            <Meta title={title} description={description}/>
        </Card>
    );
};

export default CardMusic;
