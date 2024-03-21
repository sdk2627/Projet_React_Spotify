import React, {ReactNode} from 'react';
import {Input as AntdInput} from 'antd';
import {InputProps} from 'antd/lib/input';

interface MyInputProps extends InputProps {
	className?: string;
	type?: string;
	placeholder?: string;
	marginT?: string;
	marginB?: string;
	marginL?: string;
	marginR?: string;
	widthI?: string;
	boolRequired: boolean;
	children?: ReactNode;
	prefixIcon?: ReactNode;
}

const InputCompo: React.FC<MyInputProps> = ({
																							className,
																							type,
																							placeholder,
																							marginT,
																							marginB,
																							marginL,
																							marginR,
																							widthI,
																							boolRequired,
																							children,
																							prefixIcon,
																							...props
																						}) => {

	return (
		<AntdInput
			className={` ${className || ''}`}
			type={type}
			placeholder={placeholder}
			prefix={prefixIcon}
			style={{
				marginTop: marginT,
				marginBottom: marginB,
				marginLeft: marginL,
				marginRight: marginR,
				width: widthI,
				alignSelf: 'center',
			}}
			required={boolRequired}
			autoComplete={'false'}
			{...props}
		>
			{children}
		</AntdInput>
	);
};

InputCompo.defaultProps = {
	marginT: '1.5rem',
	marginL: '2rem',
	marginR: '2rem',
	widthI: '310px',
};

export default InputCompo;
