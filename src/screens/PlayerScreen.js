import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import { Audio } from 'expo-av';
import { SvgXml } from 'react-native-svg';
import BackIcon from '../../assets/icons/Back.svg';
import PlayIcon from '../../assets/icons/Play.svg';
import ForwardIcon from '../../assets/icons/Forward.svg';
import PauseIcon from '../../assets/icons/Pause.svg';
import BackArrow from '../../assets/icons/BackIcon.svg';
import LikeIcon from '../../assets/icons/Like.svg';
import UnlikeIcon from '../../assets/icons/Unlike.svg';
import { hp, wp, fs } from '../style';

const BACKGROUND_COLOR = '#FFF8ED';
const DISABLED_OPACITY = 0.5;
const LOADING_STRING = '... loading ...';
const BUFFERING_STRING = '...buffering...';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.index = 0;
		this.isSeeking = false;
		this.shouldPlayAtEndOfSeek = false;
		this.playbackInstance = null;
		this.state = {
			playbackInstanceName: LOADING_STRING,
			muted: false,
			playbackInstancePosition: null,
			playbackInstanceDuration: null,
			shouldPlay: false,
			isPlaying: false,
			isBuffering: false,
			isLoading: true,
			shouldCorrectPitch: true,
			volume: 1.0
		};
	}

	componentDidMount() {
		Audio.setAudioModeAsync({
			allowsRecordingIOS: false,
			staysActiveInBackground: false,
			interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
			playsInSilentModeIOS: true,
			shouldDuckAndroid: true,
			interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
			playThroughEarpieceAndroid: false
		});
		this._loadNewPlaybackInstance(false);
	}

	async _loadNewPlaybackInstance(playing) {
		if (this.playbackInstance != null) {
			await this.playbackInstance.unloadAsync();
			this.playbackInstance = null;
		}

		const source = { uri: this.props.route.params.item.audio_url };
		const initialStatus = {
			shouldPlay: playing,
			shouldCorrectPitch: this.state.shouldCorrectPitch
		};

		const { sound } = await Audio.Sound.createAsync(source, initialStatus, this._onPlaybackStatusUpdate);
		this.playbackInstance = sound;

		this._updateScreenForLoading(false);
	}

	_updateScreenForLoading(isLoading) {
		if (isLoading) {
			this.setState({
				isPlaying: false,
				playbackInstanceName: LOADING_STRING,
				playbackInstanceDuration: null,
				playbackInstancePosition: null,
				isLoading: true
			});
		} else {
			this.setState({
				playbackInstanceName: this.props.route.params.item.title,
				isLoading: false
			});
		}
	}

	_onPlaybackStatusUpdate = (status) => {
		if (status.isLoaded) {
			this.setState({
				playbackInstancePosition: status.positionMillis,
				playbackInstanceDuration: status.durationMillis,
				shouldPlay: status.shouldPlay,
				isPlaying: status.isPlaying,
				isBuffering: status.isBuffering,
				muted: status.isMuted,
				volume: status.volume,
				shouldCorrectPitch: status.shouldCorrectPitch
			});
			if (status.didJustFinish && !status.isLooping) {
				this._updatePlaybackInstanceForIndex(true);
			}
		} else {
			if (status.error) {
				console.log(`FATAL PLAYER ERROR: ${status.error}`);
			}
		}
	};

	async _updatePlaybackInstanceForIndex(playing) {
		this._updateScreenForLoading(true);

		this._loadNewPlaybackInstance(playing);
	}

	_onPlayPausePressed = () => {
		if (this.playbackInstance != null) {
			if (this.state.isPlaying) {
				this.playbackInstance.pauseAsync();
			} else {
				this.playbackInstance.playAsync();
			}
		}
	};
	_onSeekSliderValueChange = (value) => {
		if (this.playbackInstance != null && !this.isSeeking) {
			this.isSeeking = true;
			this.shouldPlayAtEndOfSeek = this.state.shouldPlay;
			this.playbackInstance.pauseAsync();
		}
	};

	_onSeekSliderSlidingComplete = async (value) => {
		if (this.playbackInstance != null) {
			this.isSeeking = false;
			const seekPosition = value * this.state.playbackInstanceDuration;
			if (this.shouldPlayAtEndOfSeek) {
				this.playbackInstance.playFromPositionAsync(seekPosition);
			} else {
				this.playbackInstance.setPositionAsync(seekPosition);
			}
		}
	};

	_getSeekSliderPosition() {
		if (
			this.playbackInstance != null &&
			this.state.playbackInstancePosition != null &&
			this.state.playbackInstanceDuration != null
		) {
			return this.state.playbackInstancePosition / this.state.playbackInstanceDuration;
		}
		return 0;
	}

	_getMMSSFromMillis(millis) {
		const totalSeconds = millis / 1000;
		const seconds = Math.floor(totalSeconds % 60);
		const minutes = Math.floor(totalSeconds / 60);

		const padWithZero = (number) => {
			const string = number.toString();
			if (number < 10) {
				return '0' + string;
			}
			return string;
		};
		return padWithZero(minutes) + ':' + padWithZero(seconds);
	}

	_getTimestamp() {
		if (
			this.playbackInstance != null &&
			this.state.playbackInstancePosition != null &&
			this.state.playbackInstanceDuration != null
		) {
			return `${this._getMMSSFromMillis(this.state.playbackInstancePosition)} / ${this._getMMSSFromMillis(
				this.state.playbackInstanceDuration
			)}`;
		}
		return '';
	}

	render() {
		return (
			<View style={styles.container}>
				<TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ marginLeft: wp(32) }}>
					<SvgXml xml={BackArrow} />
				</TouchableOpacity>

				<Text style={styles.title}>{this.state.playbackInstanceName}</Text>
				<Text style={styles.author}>{this.props.route.params.item.author}</Text>
				<View
					style={[
						styles.playerButtonsWrapper,
						{
							opacity:
								this.state.isLoading ? DISABLED_OPACITY :
								1.0
						}
					]}
				>
					<TouchableOpacity
						underlayColor={BACKGROUND_COLOR}
						style={styles.wrapper}
						onPress={() => {
							this.playbackInstance.setStatusAsync({
								positionMillis: this.state.playbackInstancePosition - 10000
							});
						}}
						disabled={this.state.isLoading}
					>
						<SvgXml xml={BackIcon} />
					</TouchableOpacity>
					<TouchableOpacity
						underlayColor={BACKGROUND_COLOR}
						style={styles.wrapper}
						onPress={this._onPlayPausePressed}
						disabled={this.state.isLoading}
					>
						<SvgXml
							xml={

									!this.state.isPlaying ? PlayIcon :
									PauseIcon
							}
						/>
					</TouchableOpacity>
					<TouchableOpacity
						underlayColor={BACKGROUND_COLOR}
						style={styles.wrapper}
						onPress={async () => {
							this.playbackInstance.setStatusAsync({
								positionMillis: this.state.playbackInstancePosition + 10000
							});
						}}
						disabled={this.state.isLoading}
					>
						<SvgXml xml={ForwardIcon} />
					</TouchableOpacity>
				</View>
				<View style={styles.bottomWrapper}>
					<View
						style={[
							styles.playbackContainer,
							{
								opacity:
									this.state.isLoading ? DISABLED_OPACITY :
									1.0
							}
						]}
					>
						<Slider
							style={styles.playbackSlider}
							value={this._getSeekSliderPosition()}
							onValueChange={this._onSeekSliderValueChange}
							onSlidingComplete={this._onSeekSliderSlidingComplete}
							disabled={this.state.isLoading}
						/>
						<View style={{ ...styles.row, justifyContent: 'space-between', marginTop: hp(32) }}>
							<View style={styles.row}>
								<SvgXml style={{ marginRight: wp(15) }} xml={LikeIcon} />
								<Text style={styles.likeText}>{this.props.route.params.item.likes}</Text>
							</View>
							<View>
								<Text style={[ styles.likeText ]}>
									{
										this.state.isBuffering ? BUFFERING_STRING :
										''}
									<Text style={[ styles.likeText, { color: '#ffff' } ]}>{this._getTimestamp()}</Text>
								</Text>
							</View>
							<View style={styles.row}>
								<Text style={styles.likeText}>{this.props.route.params.item.dislikes}</Text>
								<SvgXml style={{ marginLeft: wp(15) }} xml={UnlikeIcon} />
							</View>
						</View>
						<View style={styles.divider} />
						<Text style={styles.description}>{this.props.route.params.item.description}</Text>
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: hp(65),
		backgroundColor: '#19232F'
	},
	title: {
		fontSize: fs(24),
		fontWeight: '500',
		color: '#ffff',
		width: wp(236),
		alignSelf: 'center',
		textAlign: 'center',
		marginTop: hp(48)
	},
	author: {
		fontSize: fs(14),
		fontWeight: '400',
		color: '#898F97',
		width: wp(236),
		alignSelf: 'center',
		textAlign: 'center',
		marginTop: hp(12)
	},
	playerButtonsWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'center'
	},
	bottomWrapper: {
		flexGrow: 1,
		borderTopLeftRadius: fs(24),
		borderTopRightRadius: fs(24),
		backgroundColor: '#09121C',
		paddingHorizontal: wp(33),
		paddingVertical: hp(34)
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	likeText: {
		fontSize: fs(14),
		fontWeight: '400',
		color: '#fff',
		alignSelf: 'center',
		textAlign: 'center'
	},
	divider: {
		width: wp(309),
		borderBottomWidth: 1,
		borderColor: '#898F97',
		marginTop: hp(23)
	},
	description: {
		color: '#898F97',
		fontWeight: '400',
		fontSize: fs(13),
		marginTop: hp(20)
	}
});
