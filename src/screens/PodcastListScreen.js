import { StyleSheet, Text, View, FlatList, TextInput } from 'react-native';
import React from 'react';
import { useGetPodcastListMutation } from '../app/apiSlice';
import { WrapperView, PodcastListItem } from '../components';
import { SvgXml } from 'react-native-svg';
import Logo from '../../assets/icons/Logo.svg';
import SearchIcon from '../../assets/icons/search.svg';
import { wp, hp, fs } from '../style';
const WV = WrapperView(View);
export default function PodcastListScreen({ navigation: { navigate } }) {
	const [ data, setData ] = React.useState([]);
	const [ getPodcasList, { isLoading } ] = useGetPodcastListMutation();
	const getList = async (query) => {
		try {
			const response = await getPodcasList(query);
			console.log('response', response);
			setData(response.data);
		} catch (error) {
			console.log(error);
		}
	};
	React.useEffect(() => {
		getList();
	}, []);
	return (
		<WV isLoading={isLoading}>
			<View style={{ flex: 1, backgroundColor: '#09121C', paddingTop: hp(53), paddingLeft: wp(30) }}>
				<SvgXml width={fs(90)} height={hp(42)} xml={Logo} style={{ alignSelf: 'baseline' }} />

				<Text style={styles.header}>Browse</Text>
				<View style={styles.searchBar}>
					<TextInput
						style={styles.searchBarInput}
						onChangeText={(text) => getList(`text=${text}`)}
						placeholder="Search..."
						placeholderTextColor={'#898F97'}
					/>
					<SvgXml width={fs(20)} height={fs(20)} xml={SearchIcon} />
				</View>
				<Text style={styles.listHeader}>Podcast ({data.length})</Text>
				<FlatList
					data={data}
					keyExtractor={(item) => item.description}
					initialNumToRender={5}
					renderItem={({ item }) => (
						<PodcastListItem
							author={item.author}
							text={item.title}
							onPress={() => navigate('PlayerScreen', { item })}
						/>
					)}
				/>
			</View>
		</WV>
	);
}

const styles = StyleSheet.create({
	header: {
		fontWeight: 'bold',
		fontSize: fs(48),
		color: '#FFFFFF',
		marginTop: hp(38),
		marginBottom: hp(32)
	},
	searchBar: {
		height: hp(48),
		width: wp(312),
		backgroundColor: '#010304',
		borderRadius: fs(16),
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: wp(16)
	},
	searchBarInput: {
		flex: 1,
		color: '#fff',
		fontSize: fs(14),
		fontWeight: '500'
	},
	listHeader: {
		color: '#898F97',
		fontSize: fs(16),
		marginTop: hp(10),
		marginLeft: wp(5)
	}
});
