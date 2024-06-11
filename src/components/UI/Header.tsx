import {ConfigProvider, Layout, Menu} from 'antd';
import DropdownList from "./DropdownList";
import {useNavigate, useLocation} from 'react-router-dom';
import {useEffect, useState} from "react";
import spotify from "../../assets/Spotify_logo_without_text.png";

const {Header} = Layout;

const HeaderComponent: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [selectedMenuKey, setSelectedMenuKey] = useState('');

	useEffect(() => {
		const key = location.pathname.split('/').pop();
		// @ts-ignore
		setSelectedMenuKey(key);
	}, [location]);

	const handleMenuClick = (path: string, key: string) => {
		navigate(path);
		setSelectedMenuKey(key);
	};

	const handleLogoClick = () => {
		navigate("/dashboard");
	};

	return (
		<ConfigProvider
			theme={{
				components: {
					Layout: {
						lightTriggerColor: 'rgba(255,255,255, 0.88)',
					},
				},
			}}
		>
			<Layout className="layout">
				<Header style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					background: 'linear-gradient(to bottom, #1DB954 0%, rgb(41, 43, 33) 80%)',
					height: '70px',
					padding: '0 30px'
				}}>

					<div style={{display: 'flex', alignItems: 'center'}}>
						<div className="demo-logo" onClick={handleLogoClick} style={{display: 'flex', alignItems: 'center'}}>
							<img src= {spotify} alt="Logo" style={{
								height: '45px',
								width: '45px',
								marginRight: '20px',
								cursor: "pointer"
							}}/>
						</div>
						<ConfigProvider
							theme={{
								components: {
									Menu: {
										horizontalItemSelectedColor: 'rgb(210,255,161)',
										itemHoverColor: 'rgb(210,255,161)',
										activeBarBorderWidth: 0,
										itemColor: 'rgba(255,255,255, 0.88)',
									},
								},
							}}
						>
							<Menu mode="horizontal" selectedKeys={[selectedMenuKey]}
										style={{
											background: 'linear-gradient(to bottom, #1DB954 0%, rgb(41, 43, 33) 80%)',
											color: 'white',
											fontSize: "18px",
											borderBottom: "0px transparent",
										}}
							>
								<Menu.Item key="dashboard" style={{marginLeft: "30px"}}
													 onClick={() => handleMenuClick("/dashboard", "dashboard")}>
									Dashboard
								</Menu.Item>

								<Menu.Item key="clients" style={{marginLeft: "30px"}}
													 onClick={() => handleMenuClick("/dashboard", "dashboard")}>
									My Spotify
								</Menu.Item>
							</Menu>
						</ConfigProvider>
					</div>
					<DropdownList/>
				</Header>
			</Layout>
		</ConfigProvider>
	);
};
export default HeaderComponent;
