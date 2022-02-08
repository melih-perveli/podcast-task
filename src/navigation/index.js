import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LogInscreen from '../screens/LogInScreen';
import PlayerScreen from '../screens/PlayerScreen';
import PodcastListScreen from '../screens/PodcastListScreen';

const Stack = createNativeStackNavigator();

function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="LogInscreen" screenOptions={{ headerShown: false }}>
				<Stack.Screen name="LogInscreen" component={LogInscreen} />
				<Stack.Screen name="PodcastListScreen" component={PodcastListScreen} />
				<Stack.Screen name="PlayerScreen" component={PlayerScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default App;
