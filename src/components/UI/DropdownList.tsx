import React, {useState} from 'react';
import {FaUser} from "react-icons/fa6";
import {RiLogoutCircleRLine} from "react-icons/ri";
import {FaChevronDown} from "react-icons/fa";
import type {MenuProps} from 'antd';
import {Avatar, Button, Dropdown, message, Space} from 'antd';
import {useNavigate} from "react-router-dom";
import ModalUserInfo from "../Modal/ModalUserInfo.tsx";

const DropdownList: React.FC = () => {

	const navigate = useNavigate();
	const [isModalUserIOpen, setIsModalUserIOpen] = useState(false);
	const firstName = window.localStorage.getItem('firstname');

	const handleProfileClick = () => {
		setIsModalUserIOpen(true);
	};

	const handleLogoutClick = () => {
		localStorage.clear();
		navigate('/');
		message.info('Déconnexion réussie ✅', 3);
	};

	const items: MenuProps['items'] = [
		{
			label: 'Accéder au profil',
			key: '1',
			icon: <FaUser/>,
			onClick: handleProfileClick,
		},
		{
			type: 'divider',
		},
		{
			label: 'Se deconnecté',
			key: '4',
			icon: <RiLogoutCircleRLine/>,
			danger: true,
			onClick: handleLogoutClick,
		},
	];

	const menuProps = {
		items,
	};

	if (firstName)
		return (
			<Space wrap>
				<Dropdown menu={menuProps}>
					<Button
						style={{background: 'transparent', borderColor: 'transparent', color: 'white', marginLeft: '20px'}}>
						<Space style={{fontSize: '15px'}}>
							<Avatar
								style={{
									background: "white",
									color: 'rgb(58,17,91)',
									borderColor: 'rgb(70,58,87)',
									fontSize: '17px',
									fontWeight: 'lighter'
								}}>{(firstName).charAt(0)}</Avatar>
							{firstName}
							<FaChevronDown/>
						</Space>
					</Button>
				</Dropdown>
				<ModalUserInfo open={isModalUserIOpen} setOpen={setIsModalUserIOpen}/>
			</Space>
		);
};

export default DropdownList;
