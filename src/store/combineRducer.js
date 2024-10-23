// import { combineReducers } from '@reduxjs/toolkit';
import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './userSlice';
import counterSlice from './counterSlice';

export const rootReducer = persistCombineReducers(
	{ key: 'learning-react', storage },
	{
		user: userReducer,
		counter: counterSlice,
	}
);
