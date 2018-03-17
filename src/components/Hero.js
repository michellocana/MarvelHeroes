import React, { Component } from 'react';
import {
	Text,
	View,
	StyleSheet,
	Image,
	Dimensions,
	TouchableNativeFeedback
} from 'react-native';

import COLORS from '../constants/Colors';
import defaultThumbnail from '../img/hero-placeholder.jpg';

const windowWidth = Dimensions.get('window').width;

const DEFAULT_DESCRIPTION = 'No description provided.';

class Hero extends Component {
	constructor(props) {
		super(props);
		this.onRef = this.onRef.bind(this);
		this.onPress = this.onPress.bind(this);
	}

	onRef(ref) {
		this.viewRef = ref;
	}

	onPress() {
		// Measuring position in window to perform HeroDetail animation
		this.viewRef.measureInWindow((x, y, width, height) => {
			const dimensions = { x, y, width, height };
			const { data } = this.props;
			const { description } = data;

			this.props.onPress({
				...data,
				image: this.getThumbnail(),
				description: description || DEFAULT_DESCRIPTION,
			}, dimensions);
		});
	}

	getThumbnailURL() {
		const {
			extension: thumbExtension,
			path: thumbPath
		} = this.props.data.thumbnail;

		return `${thumbPath}.${thumbExtension}`;
	}

	getThumbnail() {
		const thumbnailURL = this.getThumbnailURL();

		if (thumbnailURL.endsWith('image_not_available')) {
			return defaultThumbnail;
		}

		return { uri: thumbnailURL };
	}

	render() {
		const { index, data } = this.props;

		const {
			imageStyle,
			titleStyle,
			containerStyle,
			firstOfListContainerStyle
		} = styles;

		const isFirstOfList = index === 0;

		const name = `#${index + 1} - ${data.name}`;

		return (
			<View
				ref={this.onRef}
				style={[
					containerStyle,
					isFirstOfList && firstOfListContainerStyle
				]}
			>
				<TouchableNativeFeedback
					useForeground
					delayPressIn={0}
					onPress={this.onPress}
				>
					<View>
						<Image
							style={imageStyle}
							source={this.getThumbnail()}
						/>

						<Text style={titleStyle}>
							{name}
						</Text>
					</View>
				</TouchableNativeFeedback>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	containerStyle: {
		flex: 0,
		// height: 300,
		marginHorizontal: 10,
		marginBottom: 10,
		elevation: 4,
		backgroundColor: COLORS.WHITE
	},

	firstOfListContainerStyle: {
		marginTop: 10
	},

	titleStyle: {
		fontSize: 18,
		lineHeight: 22,
		color: COLORS.BLACK,
		padding: 16
	},

	imageStyle: {
		width: windowWidth,
		height: 300
	}
});

export default Hero;
