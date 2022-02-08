import React, { useState } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Audio } from 'expo-av';

export default function App() {
	const [ loading, setLoading ] = useState(true);
	const [ sound, setSound ] = useState();

	async function playSound() {
		console.log('Loading Sound');
		const { sound } = await Audio.Sound.createAsync({
			uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
		});
		setSound(sound);

		console.log('Playing Sound');
		await sound.playAsync();
	}
	async function createSound() {
		setLoading(true);
		const { sound } = await Audio.Sound.createAsync({
			uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
		});
		setSound(sound);
		setLoading(false);
	}

	React.useEffect(
		() => {
			return;


				sound ? () => {
					console.log('Unloading Sound');
					sound.unloadAsync();
				} :
				undefined;
		},
		[ sound ]
	);

	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Button title="Play Sound" onPress={playSound} />
		</View>
	);
}
