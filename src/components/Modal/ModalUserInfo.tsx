import React,{Dispatch,SetStateAction,useState} from 'react';
import {Button,Input,Modal} from 'antd';


interface ModalCompoProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

const ModalUserInfo: React.FC<ModalCompoProps> = ({open,setOpen}) => {
    const firstname = window.localStorage.getItem('firstname');
    const lastname = window.localStorage.getItem('lastname');
    const email = window.localStorage.getItem('email');
    const country = window.localStorage.getItem('country');
    const product = window.localStorage.getItem('product');

    const [firstNameUser,setFirstName] = useState(firstname || '');
    const [lastNameUser,setLastName] = useState(lastname || '');
    const [emailUser,setEmail] = useState(email || '');
    const [countryUser,setCountry] = useState(country || '');
    const [productUser,setProduct] = useState(product || '');

    const handleCancel = () => {
        setOpen(false);
    };

    const modalStyles = {

        mask: {
            backdropFilter: 'blur(10px)',
        },
    };

    return (
        <Modal
            open={open}
            title="Informations utilisateur :"
            onCancel={handleCancel}
            styles={modalStyles}
            width={"800px"}
            footer={[
                <Button key="back" onClick={handleCancel}>
                    Fermer
                </Button>,
            ]}
        >
            <Input
                addonBefore="Nom:"
                value={lastNameUser}
                onChange={(e) => setLastName(e.target.value)}
                disabled={true}
                style={{marginBottom: "20px",marginTop: "20px"}}
            />
            <Input
                addonBefore="Prénom:"
                value={firstNameUser}
                onChange={(e) => setFirstName(e.target.value)}
                disabled={true}
                style={{marginBottom: "20px"}}
            />
            <Input
                type={"email"}
                addonBefore="Email:"
                value={emailUser}
                onChange={(e) => setEmail(e.target.value)}
                disabled={true}
                style={{marginBottom: "20px"}}
            />
            <Input
                addonBefore="Type d'abonnement:"
                value={productUser}
                onChange={(e) => setProduct(e.target.value)}
                style={{marginBottom: "20px"}}
                disabled={true}
            />
            <Input
                addonBefore="Pays:"
                value={countryUser}
                onChange={(e) => setCountry(e.target.value)}
                style={{marginBottom: "20px"}}
                disabled={true}
            />
        </Modal>
    )
        ;
}


export default ModalUserInfo;
