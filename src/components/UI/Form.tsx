import React from 'react';
import { Form as AntdForm } from 'antd';

interface FormProps {
	className?: string;
	type?: string;
	placeholder?: string;
	children?: React.ReactNode;
	prefixIcon?: React.ReactNode;
}

const Form: React.FC<FormProps> = ({
																		 className,
																		 type, placeholder,
																		 children,
																		 prefixIcon,
																		 ...props }) => {
	return (
		<AntdForm
			name="basic"
			labelCol={{ span: 8 }}
			wrapperCol={{ span: 16 }}
			style={{
				width: 500,
				height: 510,
				textAlign: 'center',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				backgroundColor: 'white',
				borderRadius: '20px',
				borderColor: 'white'
			}}
			autoComplete="off"
			{...props}
		>
			{children}
		</AntdForm>
	);
};

export default Form;
