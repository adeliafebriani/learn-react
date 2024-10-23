import { createContext, useReducer } from 'react';

export const UserContext = createContext({});

const reducer = (state, action) => {
	switch (action.type) {
		case 'add-user':
			return { ...state, ...action.payload };
		case 'init':
			return { ...action.payload };
		default:
			return state;
	}
};

export const CustomProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, { name: '', email: '' });

	return <UserContext.Provider value={{ state, dispatch }}>{children}</UserContext.Provider>;
};
