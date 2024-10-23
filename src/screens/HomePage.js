import { useSelector } from 'react-redux';
import { useAtom } from 'jotai';
import { connectWallet } from '../util/contract';
import { accountAtom } from '../atoms/contract';

function HomePage() {
	const { name, email, token } = useSelector(state => state.user);
	const [account, setAccount] = useAtom(accountAtom);

	const handleWalletConnection = async () => {
		try {
			const { account } = await connectWallet();

			setAccount(account);
		} catch (error) {
			console.error(error?.message);
		}
	};

	window?.ethereum?.on('accountsChanged', accounts => {
		const account = accounts?.length > 0 ? accounts[0] : '';
		setAccount(account);
	});

	return (
		<section className='App'>
			<main>
				<h1>
					Welcome To the Homepage{' '}
					
				</h1>

				<button onClick={handleWalletConnection}>Connect Wallet</button>
				<br></br>
				<p>
					Connected Account:
					{account && (	
						<span>
							{` ${account && account?.substring(0, 7)}.......${
								account && account?.substring(37, account?.length)
							}`}
						</span>
					)}
				</p>
			</main>
		</section>
	);
}

export default HomePage;
