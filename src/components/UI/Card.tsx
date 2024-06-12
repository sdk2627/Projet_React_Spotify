import React from 'react';
import {Card} from 'antd';
import {InputProps} from 'antd/lib/input';
import Meta from "antd/es/card/Meta";

interface MyInputProps extends InputProps {
	image?: string;
	title?: string;
	description?: string;
	popularity?: string;
}
const CardComponent: React.FC<MyInputProps> = ({
																								 image,
																								 title,
																								 description,
																								 popularity,
																							 }) => {

	return (
		<Card
			hoverable
			style={{
				width: 240,
				marginRight: 20,
				marginBottom: 30,
				borderRadius: 20,
				boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)'
			}}
			cover={
				<img alt={title} src={image} style={{width: '240px', height: '240px'}}/>
			}
		>
			<Meta title={title} description={"Followers: " + description} avatar={popularity}/>
		</Card>
	);
};

Card.defaultProps = {};

export default CardComponent;
