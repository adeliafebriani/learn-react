import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import { rootReducer } from './combineRducer';

export const store = configureStore({
	reducer: rootReducer,
});

export const persistedStore = persistStore(store);
