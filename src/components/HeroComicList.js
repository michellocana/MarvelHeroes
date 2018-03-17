import React from 'react';
import { View } from 'react-native';

import HeroComic from './HeroComic';

const HeroComicList = props => {
	const { containerStyle } = styles;
	const comics = props.data.map(comic => (
		<HeroComic
			{...comic}
			key={comic.resourceURI}
		/>
	));

	return (
		<View style={containerStyle}>
			{comics}
		</View>
	);
};

const styles = {
	containerStyle: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginLeft: -8
	}
};

export default HeroComicList;
