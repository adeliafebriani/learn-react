import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useActionCreator } from '../hooks/useActionCreators';

const Login = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { addUser } = useActionCreator();
	const navigate = useNavigate();

	const generateToken = () => {
		let tokenAlp = 'qwertyuiopasdfghjklzxcvbnm1234567890QWERTYUIOPASDFGHJKLZXCVBNM';

		let token = '';

		for (let i = 0; i < 20; i++) {
			let index = Math.floor(Math.random() * tokenAlp.length);
			token += tokenAlp[index];
		}

		return token;
	};

	const handleLogin = e => {
		e.preventDefault();
		addUser({ name, email, password, token: generateToken() });

		navigate('/metamask');
	};

	return (
		<main>
			<h1>Please provide your information to login</h1>
			<form onSubmit={handleLogin}>
				<section>
					<label>
						Name: <input name='name' type='text' value={name} onChange={e => setName(e.target.value)} />
					</label>
				</section>
				<section>
					<label>
						Email: <input name='email' type='email' value={email} onChange={e => setEmail(e.target.value)} />
					</label>
				</section>
				<section>
					<label>
						Password: <input name='password' type='password' value={password} onChange={e => setPassword(e.target.value)} />
					</label>
				</section>
				<button>Login</button>
			</form>
		</main>
	);
};

export default Login;
