import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { hp, wp, colors, fs } from '../style';
import { SvgXml } from 'react-native-svg';
import PlayIcon from '../../assets/icons/Shape.svg';
const PodcastListItem = ({ text, onPress, author }) => {
	return (
		<TouchableOpacity onPress={onPress} style={styles.container}>
			<Text style={styles.text}>{text}</Text>
			<View style={styles.icon}>
				<SvgXml xml={PlayIcon} />
			</View>
			<Text style={styles.authorText}>{author}</Text>
		</TouchableOpacity>
	);
};

PodcastListItem.propTypes = {
	text: PropTypes.string.isRequired,
	author: PropTypes.string.isRequired,
	onPress: PropTypes.func.isRequired
};
const styles = StyleSheet.create({
	container: {
		width: wp(309),
		height: hp(180),
		borderTopLeftRadius: fs(16),
		borderTopRightRadius: fs(16),
		borderBottomLeftRadius: fs(16),
		borderTopLeftRadius: fs(16),
		borderWidth: 1,
		paddingLeft: wp(32),
		paddingTop: hp(29),
		backgroundColor: '#010304',
		marginTop: hp(20)
	},
	text: {
		fontWeight: '500',
		fontSize: fs(24),
		color: '#ffff',
		width: wp(236)
	},
	icon: {
		backgroundColor: '#FF334B',
		height: fs(50),
		width: fs(50),
		borderRadius: fs(25),
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'flex-end',
		position: 'absolute',
		right: wp(24),
		bottom: wp(24)
	},
	authorText: {
		fontWeight: '400',
		fontSize: fs(15),
		color: '#fff',
		position: 'absolute',
		bottom: hp(30),
		left: wp(56)
	}
});

export { PodcastListItem };
