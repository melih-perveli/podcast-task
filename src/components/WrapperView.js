import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const WrapperView = (Comp) => ({ isLoading, children, style, paddingTop, ...props }) => {
	return (
		<View style={[ { flex: 1 } ]}>
			<StatusBar style="light" />

			<Comp style={{ flex: 1 }} {...props}>
				{children}
			</Comp>
			{isLoading && (
				<View
					style={[
						StyleSheet.absoluteFill,
						{ backgroundColor: 'rgba(0, 0, 0, 0.7)', justifyContent: 'center' }
					]}
				>
					<ActivityIndicator size="large" color="#fff" />
				</View>
			)}
		</View>
	);
};
export { WrapperView };
