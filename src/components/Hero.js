import React, { Component } from 'react';
import {
	Text,
	View,
	StyleSheet,
	Image,
	Dimensions,
	TouchableNativeFeedback
} from 'react-native';

import HeroDetail from './HeroDetail';

import defaultThumbnail from '../img/hero-placeholder.jpg';

const windowWidth = Dimensions.get('window').width;

class Hero extends Component {

	constructor(props) {
		super(props);
		this.onPress = this.onPress.bind(this);
	}

	getThumbnail() {
		const { 
			extension: thumbExtension, 
			path: thumbPath 
		} = this.props.data.thumbnail;

		const thumbnailURL = `${thumbPath}.${thumbExtension}`;
	
		if (thumbPath.endsWith('image_not_available')) {
			return defaultThumbnail;
		}

		return { uri: thumbnailURL };
	}

	onPress() {
		// Measuring position in window to perform HeroDetail animation
		this.viewRef.measureInWindow((x, y, width, height) => {
			const dimensions = { x, y, width, height };

			this.props.onPress({
				image: this.getThumbnail(),
				...this.props.data
			}, dimensions);
		});
	}

	render() {
		const { index, data } = this.props;

		const { 
			containerStyle, 
			firstOfListContainerStyle 
		} = styles;

		const imageStyle = {
			width: windowWidth,
			height: 300
		};

		const isFirstOfList = index === 0;

		return (
			<View 
				ref={ref => this.viewRef = ref}
				style={[
					containerStyle,
					isFirstOfList && firstOfListContainerStyle
				]}
			>
				<TouchableNativeFeedback 
					delayPressIn={0}
					useForeground={true}
					onPress={this.onPress}
				>
					<View>
						<Image
							style={imageStyle}
							source={this.getThumbnail()}
						/>		
					</View>
				</TouchableNativeFeedback>
			</View>
		);
	}

}

const styles = StyleSheet.create({
	containerStyle: {
		flex: 0,
		height: 300,
		marginHorizontal: 10,
		marginBottom: 10,
		elevation: 4,
		backgroundColor: '#f8f8f8'
	},

	firstOfListContainerStyle: {
		marginTop: 10
	}
});

export default Hero;