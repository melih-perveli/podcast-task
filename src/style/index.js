import { StyleSheet } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';
export const colors = {};

const referenceWidth = 376;
const referenceHeight = 812;

export const wp = (width) => {
	const givenWidth = width * 100 / referenceWidth;
	const result = widthPercentageToDP(givenWidth);
	return result;
};

export const hp = (height) => {
	const givenHeight = height * 100 / referenceHeight;
	const result = heightPercentageToDP(givenHeight);
	return result;
};
export const commonStyle = StyleSheet.create({
	row: {
		flexDirection: 'row',
		alignItems: 'center'
	}
});
export const fs = (fontSize) => RFValue(fontSize, referenceHeight);
