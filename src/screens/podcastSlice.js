import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
	name: 'main',
	initialState: {
		access_token: ''
	},
	reducers: {
		setAccessToken: (state, { payload }) => {
			state.access_token = payload;
		}
	}
});

export const { setAccessToken } = slice.actions;

export default slice.reducer;
