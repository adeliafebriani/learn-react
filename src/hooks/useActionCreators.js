import { useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { addUser } from '../store/userSlice';
import { increaseCount, decreaseCount } from '../store/counterSlice';

export const useActionCreator = () => {
	const dispatch = useDispatch();

	return bindActionCreators({ addUser, increaseCount, decreaseCount }, dispatch);
};
