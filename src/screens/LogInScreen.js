import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import React, { useState } from 'react';
import { AuthenticationInput as Input, AuthenticationButton as Button, WrapperView } from '../components';
import { useLogInMutation } from '../app/apiSlice';
import { wp, hp, fs } from '../style';
import { SvgXml } from 'react-native-svg';
import Logo from '../../assets/icons/Logo.svg';
import Constants from 'expo-constants';
import { setAccessToken } from './podcastSlice';
import { useDispatch } from 'react-redux';
import * as SecureStore from 'expo-secure-store';
const WV = WrapperView(View);
export default function LogInScreen({ navigation: { navigate } }) {
	const [ logIn, { isLoading } ] = useLogInMutation();
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const dispatch = useDispatch();
	const logInOnPress = async () => {
		try {
			const response = await logIn({ email, password }).unwrap();
			const { access_token } = response;
			await SecureStore.setItemAsync('access_token', access_token);
			dispatch(setAccessToken(access_token));
			navigate('PodcastListScreen');
		} catch (error) {
			console.log('error', error);
		}
	};
	return (
		<WV isLoading={isLoading}>
			<ImageBackground
				style={{ width: wp(376), height: hp(812) }}
				source={require('../../assets/background.png')}
			>
				<View style={styles.container}>
					<SvgXml width={fs(156)} height={hp(72)} xml={Logo} style={{ alignSelf: 'baseline' }} />
					<Text style={styles.text}>Episodic series of digital audio.</Text>
					<Input
						placeholder="E-mail address"
						autoCapitalize="none"
						onChangeText={(text) => setEmail(text)}
						keyboardType="email-address"
						keyboardAppearance="dark"
						autoComplete="off"
					/>
					<Input
						style={{ marginTop: hp(16), marginBottom: hp(30) }}
						secure
						keyboardAppearance="dark"
						placeholder="Password"
						keyboardType="visible-password"
						autoComplete="off"
						secureTextEntry
						onChangeText={(password) => setPassword(password)}
					/>
					<Button onPress={() => logInOnPress()} />
				</View>
			</ImageBackground>
		</WV>
	);
}

const styles = StyleSheet.create({
	text: {
		height: hp(60),
		width: wp(195),
		fontSize: fs(24),
		color: '#FFFFFF',
		alignSelf: 'baseline',
		marginBottom: hp(72),
		marginTop: hp(48)
	},
	container: {
		width: wp(342),
		height: hp(759),
		backgroundColor: 'rgba(9, 18, 28, 0.95)',
		borderBottomEndRadius: fs(24),
		paddingHorizontal: wp(32),
		paddingTop: Constants.statusBarHeight + hp(56)
	}
});
