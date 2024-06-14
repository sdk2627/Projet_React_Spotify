import React from 'react';
import {Form as AntdForm} from 'antd';

interface FormProps {
    children?: React.ReactNode;
}

const Form: React.FC<FormProps> = ({
                                       children,
                                   }) => {
    return (
        <AntdForm
            name="basic"
            labelCol={{span: 8}}
            wrapperCol={{span: 16}}
            style={{
                width: 500,
                height: 510,
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                backgroundColor: 'white',
                borderRadius: '10px',
                borderColor: 'white'
            }}
            autoComplete="off"
        >
            {children}
        </AntdForm>
    );
};

export default Form;
