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
		const { containerStyle } = styles;

		const { image } = this.props.data;

		const imageDimensions = {
			width: Dimensions.get('window').width,
			height: 300
		};

		return (
			<View 
				style={containerStyle}
				ref={ref => this.viewRef = ref}
			>
				<TouchableNativeFeedback 
					delayPressIn={0}
					useForeground={true}
					onPress={this.onPress}
				>
					<View>
						<Image
							style={imageDimensions}
							source={{
								uri: image,
								...imageDimensions
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
		margin: 10,
		elevation: 3,
		backgroundColor: '#f8f8f8'
	}
});

export default Hero;