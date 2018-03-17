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

const INITIAL_STATE = {
	image: null
};

export default class HeroComic extends Component {
	constructor(props) {
		super(props);

		this.state = INITIAL_STATE;
	}

	componentDidMount() {
		const api = new Api();

		const { resourceURI } = this.props;

		const comicID = resourceURI.substr(resourceURI.lastIndexOf('/') + 1);

		api.getComic(comicID).then(comic => {
			const {
				extension: thumbExtension,
				path: thumbPath
			} = comic.thumbnail;

			if (!thumbPath.endsWith('image_not_available')) {
				const thumbnailURL = `${thumbPath}.${thumbExtension}`;

				this.setState({
					image: { uri: thumbnailURL }
				});
			}
		});
	}

	renderThumbnail() {
		const { image } = this.state;
		const { imageStyle, thumbnailStyle } = styles;

		if (image) {
			return (
				<Image
					source={image}
					style={[imageStyle, thumbnailStyle]}
				/>
			);
		}

		return null;
	}

	render() {
		const {
			textStyle,
			imageStyle,
			wrapperStyle,
			containerStyle,
			imageContainerStyle
		} = styles;
		const { name } = this.props;

		return (
			<View style={wrapperStyle}>
				<View style={containerStyle}>
					<View style={[imageContainerStyle, imageStyle]}>
						<Image
							style={imageStyle}
							source={logoMarvel}
						/>

						{this.renderThumbnail()}
					</View>

					<Text style={textStyle}>
						{name}
					</Text>
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
		height: ((windowWidth - 40) / 2) * 1.53
	},

	imageContainerStyle: {
		backgroundColor: COLORS.RED
	},

	textStyle: {
		fontSize: 16,
		color: COLORS.BLACK,
		paddingTop: 4
	},

	thumbnailStyle: {
		position: 'absolute',
		top: 0,
		left: 0
	}
});
