import React, {Dispatch, SetStateAction, useState} from 'react';
import {Button, Input, Modal} from 'antd';


interface ModalCompoProps {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

const ModalUserInfo: React.FC<ModalCompoProps> = ({open, setOpen}) => {
	const firstname= window.localStorage.getItem('firstname');
	const lastname= window.localStorage.getItem('lastname');
	const email= window.localStorage.getItem('email');
	const country= window.localStorage.getItem('country');
	const product= window.localStorage.getItem('product');
	// @ts-ignore
	const [firstNameUser, setFirstName] = useState(firstname || '');
	// @ts-ignore
	const [lastNameUser, setLastName] = useState(lastname || '');
	// @ts-ignore
	const [emailUser, setEmail] = useState(email || '');
	// @ts-ignore
	const [countryUser, setCountry] = useState(country || '');
	// @ts-ignore
	const [productUser, setProduct] = useState(product || '');
	// @ts-ignore

	const handleCancel = () => {
		console.log('Clicked cancel button');
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
					disabled={true}
					style={{marginBottom: "20px", marginTop: "20px"}}
				/>
				<Input
					addonBefore="Prénom:"
					value={firstNameUser}
					disabled={true}
					style={{marginBottom: "20px"}}
				/>
				<Input
					type={"email"}
					addonBefore="Email:"
					value={emailUser}
					disabled={true}
					style={{marginBottom: "20px"}}
				/>
				<Input
					addonBefore="Type d'abonnement:"
					value={productUser}
					style={{marginBottom: "20px"}}
					disabled={true}
				/>
				<Input
					addonBefore="Pays:"
					value={countryUser}
					style={{marginBottom: "20px"}}
					disabled={true}
				/>
			</Modal>
		)
			;
}


export default ModalUserInfo;
