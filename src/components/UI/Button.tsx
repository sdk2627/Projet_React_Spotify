import React from 'react';
import PropTypes from 'prop-types';
import {Button as AntdButton} from 'antd';
import {BaseButtonProps} from "antd/es/button/button";

interface ButtonProps extends BaseButtonProps {
	className?: string;
	bgcolor?: string;
	fontColor?: string;
	marginT?: string;
	marginR?: string;
	widthB?: string;
	borderR?: string;
	borderColor?: string;
	boxShadow?: string;
	onClick?: () => void;
	children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
																				 className,
																				 bgcolor,
																				 fontColor,
																				 marginT,
																				 marginR,
																				 widthB,
																				 borderR,
																				 borderColor,
																				 boxShadow,
																				 children,
																				 ...props
																			 }) => {
	return (
		<AntdButton
			className={` ${className || ''} `}
			type="primary"
			style={{
				background: bgcolor, color: fontColor, borderColor: bgcolor, marginTop: marginT, marginRight: marginR,
				width: widthB, alignSelf: 'center', borderRadius: borderR, borderInlineColor: borderColor, borderBlockColor: borderColor, boxShadow: boxShadow
			}}
			{...props}
		>
			{children}
		</AntdButton>
	);
};

Button.defaultProps = {
	marginT: '0.5rem',
	bgcolor: '#4EF037',
	fontColor: 'black',
};

Button.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node,
};

export default Button;
