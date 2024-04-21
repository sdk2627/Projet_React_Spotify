import React, {useState} from 'react';
import {LeftCircleOutlined, PlayCircleOutlined, RightCircleOutlined, PauseCircleOutlined} from '@ant-design/icons';
import {Card} from 'antd';
import {InputProps} from "antd/lib/input";
import Meta from "antd/es/card/Meta";

interface MyInputProps extends InputProps {
	image?: string;
	title?: string;
	description?: string;
	onPlayClick?: () => void;
	onPauseClick?: () => void;
}


const CardMusic: React.FC<MyInputProps> = ({
																						 image,
																						 title,
																						 description,
																						 onPlayClick,
																						 onPauseClick,
																					 }) => {

	const [isPlaying, setIsPlaying] = useState(false);

	const handlePlayClick = () => {
		if (isPlaying) {
			if (onPauseClick) {
				onPauseClick();
			}
		} else {
			if (onPlayClick) {
				onPlayClick();
			}
		}
		setIsPlaying(!isPlaying);
	};

	return (
		<Card
			style={{objectFit:"cover", width: 600, height: 400, margin: "40px 50px 40px 50px"}}
			cover={
				<img
					alt="Pochette de l'album"
					src={image}
					style={{objectFit:"cover",width: '600px', height: '250px'}}
				/>
			}
			actions={[
				<LeftCircleOutlined key="previous"/>,
				isPlaying ? <PauseCircleOutlined key="play-pause" onClick={handlePlayClick} /> : <PlayCircleOutlined key="play-stop" onClick={handlePlayClick} />,
				<RightCircleOutlined key="next"/>,
			]}
		>
			<Meta
				title={title}
				description={description}
			/>
		</Card>
	);
};

export default CardMusic;
