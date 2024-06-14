import React, {ReactNode} from "react";
import { Layout } from 'antd';
import {ContentProps} from "rc-tooltip/es/Popup";

const { Content } = Layout;

interface MyContentProps extends ContentProps {
	margin?: string;
	padding?: string;
	width?: string;
	heigth?: string;
	children: ReactNode;
}

const ContentComponent: React.FC<MyContentProps> = ({
																							margin,
																							padding,
																							width,
																							heigth,
																							children,
																							...props
																						}) => {
	return (
		<Content
			style={{
				padding: padding,
				margin: margin,
				height: heigth,
				minWidth: width,
				background: 'white',
				borderRadius: '10px',
				overflowY: 'auto',
			}}
			{...props}
		>
			{children}
		</Content>
	);
}

export default ContentComponent;
