import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { hp, wp, fs } from '../style';
const AuthenticationButton = ({ onPress }) => {
	return (
		<TouchableOpacity onPress={onPress} style={styles.container}>
			<Text>Login</Text>
		</TouchableOpacity>
	);
};

AuthenticationButton.propTypes = {
	onPress: PropTypes.func.isRequired
};
const styles = StyleSheet.create({
	container: {
		width: wp(276),
		height: hp(51),
		alignSelf: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#3369FF',
		borderRadius: fs(99),
		shadowColor: 'rgba(51, 105, 255, 0.7)'
		//TODO shadow yapılacak
	}
});

export { AuthenticationButton };
