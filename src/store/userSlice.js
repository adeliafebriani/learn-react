import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		name: '',
		token: '',
		email: '',
	},
	reducers: {
		addUser: (state, action) => {
			state.name = action.payload.name;
			state.token = action.payload.token;
			state.email = action.payload.email;
		},

		removeUser: state => {
			state.name = '';
			state.token = '';
			state.email = '';
		},
	},
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
