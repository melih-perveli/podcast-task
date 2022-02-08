import { configureStore } from '@reduxjs/toolkit';
import podcastSlice from '../screens/podcastSlice';
import { apiSlice } from './apiSlice';
export default configureStore({
	reducer: {
		main: podcastSlice,
		[apiSlice.reducerPath]: apiSlice.reducer
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
});
