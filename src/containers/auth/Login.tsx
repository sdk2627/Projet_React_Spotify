import {AiFillLock, AiOutlineUser} from "react-icons/ai";
import Form from "../../components/UI/Form";
import InputCompo from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import React, {useState} from "react";
import {Divider} from "antd";
import spotify from "../../assets/Spotify_logo_without_text.png";
import InputPasswordCompo from "../../components/UI/InputPassword.tsx";
import {useNavigate} from "react-router-dom";

const Login: React.FC = () => {
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleClickSSO = () => {
		navigate('/check/spotify');
	}

	const handleLoginClick = () => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
			navigate('/')
		}, 2000);
	}

	return (
		<><title>SpotiFlow - Connexion</title>
			<div style={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
				<Form>
					<h1 style={{marginBottom: "5px"}}>Connexion</h1>
					<h4 style={{marginTop: "5px"}}>Accéder à SpotiFlow</h4>
					<Button onClick={handleClickSSO} marginT={"10px"} marginR={"0px"} widthB={"17rem"} borderR={"12px"}
									bgcolor={"transparent"} fontColor={"rgb(0,0,0)"} borderColor={"rgba(211,206,215,0.7)"}
									boxShadow={"0 0 15px rgba(0, 0, 0, 0.35)"}>
						<img src={spotify} alt="Logo Eleo" style={{marginRight: '8px', height: '18px'}}/>
						<span style={{fontSize: "15px"}}>Se connecter avec Spotify</span>
					</Button>
					<Divider type={"horizontal"}>OU</Divider>
					<InputCompo type="email" placeholder="Votre Identifiant" prefixIcon={<AiOutlineUser/>}
											value={email} onChange={(e) => setEmail(e.target.value)} boolRequired={true} marginT={"0.5rem"}/>
					<InputPasswordCompo type="Password" placeholder="Votre mot de passe" prefix={<AiFillLock/>}
															value={password} onChange={(e) => setPassword(e.target.value)} boolRequired={true}/>
					<Button onClick={handleLoginClick} children="Connexion" loading={loading}
									boxShadow={"0 0 15px rgba(0, 0, 0, 0.45)"} />
					<a style={{margin: '20px', color: "black"}}>Mot de passe oublié ?</a>
				</Form>
			</div>
		</>
	);
}

export default Login;
