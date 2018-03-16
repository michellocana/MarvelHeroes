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

const windowWidth = Dimensions.get('window').width;

class Hero extends Component {

	constructor(props) {
		super(props);
		this.onPress = this.onPress.bind(this);
	}

	onPress() {
		// Measuring position in window to perform HeroDetail animation
		this.viewRef.measureInWindow((x, y, width, height) => {
			const dimensions = { x, y, width, height };			

			this.props.onPress(this.props.data, dimensions);
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
				style={[
					containerStyle,
					isFirstOfList && firstOfListContainerStyle
				]}
				ref={ref => this.viewRef = ref}
			>
				<TouchableNativeFeedback 
					delayPressIn={0}
					useForeground={true}
					onPress={this.onPress}
				>
					<View>
						<Image
							style={imageStyle}
							source={{
								uri: data.image,
								...imageStyle
							}}
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