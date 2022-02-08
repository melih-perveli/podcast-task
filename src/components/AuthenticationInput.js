import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { hp, wp, fs } from '../style';
import { SvgXml } from 'react-native-svg';
import Secur from '../../assets/icons/Secur.svg';
import Mail from '../../assets/icons/Basic.svg';
const AuthenticationInput = ({ secure = false, style = {}, ...props }) => {
	const icon =
		secure ? <SvgXml width={fs(14)} height={fs(14)} xml={Secur} /> :
		<SvgXml width={fs(14)} height={fs(14)} xml={Mail} />;
	return (
		<View style={[ styles.container, style ]}>
			<View style={styles.iconWrapper}>{icon}</View>
			<TextInput placeholderTextColor="#898F97" style={styles.input} {...props} />
		</View>
	);
};
AuthenticationInput.propTypes = {
	secure: PropTypes.bool,
	style: PropTypes.object
};
const styles = StyleSheet.create({
	container: {
		width: wp(276),
		height: hp(58),
		borderWidth: fs(1),
		alignSelf: 'center',
		borderColor: 'rgba(255, 255, 255, 0.15)',
		borderTopLeftRadius: fs(16),
		borderTopRightRadius: fs(16),
		borderBottomLeftRadius: fs(16),
		borderTopLeftRadius: fs(16),
		paddingLeft: wp(25),
		flexDirection: 'row'
	},
	input: {
		flex: 1,
		color: '#898F97',
		fontSize: fs(14),
		paddingLeft: wp(25)
	},
	iconWrapper: {
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export { AuthenticationInput };
