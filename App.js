import React from 'react';
import Navigation from './src/navigation';
import { Provider } from 'react-redux';
import store from './src/app';
export default function App() {
	return (
		<Provider store={store}>
			<Navigation />
		</Provider>
	);
}
