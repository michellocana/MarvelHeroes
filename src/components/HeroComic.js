import React, { Component } from 'react';
import {
	Text,
	View,
	Image,
	Dimensions,
	StyleSheet
} from 'react-native';

import Api from '../utils/Api';
import COLORS from '../constants/Colors';
import logoMarvel from '../img/logo-marvel-vertical.jpg';

const dimensions = Dimensions.get('window');
const windowWidth = dimensions.width;

export default class HeroComic extends Component {

	constructor(props) {
		super(props);

		this.state = {
			image: logoMarvel
		};
	}

	componentDidMount() {
		const api = new Api();

		const { resourceURI } = this.props;

		const comicID = resourceURI.substr(resourceURI.lastIndexOf('/') + 1)

		api.getComic(comicID).then(comic => {
			const { 
				extension: thumbExtension, 
				path: thumbPath 
			} = comic.thumbnail;

			if (!thumbPath.endsWith('image_not_available')) {				
				const thumbnailURL = `${thumbPath}.${thumbExtension}`;
				
				setTimeout(() => {

				this.setState({
					image: { uri: thumbnailURL } 
				});
				}, 2000);

			}
		});
	}

	render() {
		const { image } = this.state;
		const { 
			imageStyle,
			wrapperStyle,
			containerStyle, 
			imageContainerStyle
		} = styles;

		return (
			<View style={wrapperStyle}>				
				<View style={containerStyle}> 
					<View style={[imageContainerStyle, imageStyle]}>
						<Image 
							style={[imageStyle]}
							source={image}
						/>
					</View>

					<Text>{this.props.name}</Text>
				</View>
			</View>
		);
	}

}

const styles = StyleSheet.create({
	wrapperStyle: {
		paddingLeft: 8,
		width: '50%'
	},

	containerStyle: {
		marginTop: 16,
	},

	imageStyle: {
		width: '100%',
		height: (windowWidth - 40) / 2 * 1.53
	},

	imageContainerStyle: {
		backgroundColor: COLORS.RED
	}
});