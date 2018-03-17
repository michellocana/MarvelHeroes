import React, { Component } from 'react';
import {
	View,
	Text,
	ScrollView,
	StyleSheet,
	ActivityIndicator
} from 'react-native';

import Api from '../utils/Api';
import Hero from '../components/Hero';

const INITIAL_STATE = {
	characters: []
};

export default class HeroesList extends Component {

	constructor(props) {
		super(props);

		this.state = INITIAL_STATE;
	}

	componentDidMount() {
		const api = new Api();

		api.getCharacters().then(characters => {
			this.setState({ characters });
		});
	}

	renderHeroes(characters) {
		return characters.map((hero, index) => (
			<Hero
				key={index}
				index={index}
				data={hero}
				onPress={this.props.onPress}
			/>
		));
	}

	render() {
		const {
			containerStyle,
			spinnerContainerStyle
		} = styles;

		const { characters } = this.state;
		const isLoading = characters.length === 0;

		if (isLoading) {
			return (
				<View style={spinnerContainerStyle}>
					<ActivityIndicator />
				</View>
			);
		}

		return (
			<ScrollView style={containerStyle}>
				{this.renderHeroes(characters)}
			</ScrollView>
		)
	}

}

const styles = StyleSheet.create({
	containerStyle: {
		flex: 1,
		width: '100%'
	},

	spinnerContainerStyle: {
		flex: 1,
		alignItems: 'center'
	}
})
