import { useContext } from 'react';
import { useActionCreator } from '../hooks/useActionCreators';
import { useSelector } from 'react-redux';
import { UserContext } from '../context/UserContext';

const Counter = () => {
	const count = useSelector(state => state.counter.count);
	const { increaseCount, decreaseCount } = useActionCreator();
	const { state, dispatch } = useContext(UserContext);
	
	return (
		<main>
			<h1>Counter</h1>
			{count}
			<button onClick={() => increaseCount()}>Increase Count</button>
			<button onClick={() => decreaseCount()}>Decrease Count</button>
		</main>
	);
};

export default Counter;
