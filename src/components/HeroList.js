import React, { Component } from 'react';
import {
	View,
	FlatList,
	StyleSheet,
	ActivityIndicator
} from 'react-native';

import Api from '../utils/Api';
import Hero from '../components/Hero';
import COLORS from '../constants/Colors';

const INITIAL_STATE = {
	characters: []
};

export default class HeroList extends Component {
	constructor(props) {
		super(props);

		this.state = INITIAL_STATE;
		this.api = new Api();

		this.renderHero = this.renderHero.bind(this);
		this.renderFooter = this.renderFooter.bind(this);
		this.renderSpinner = this.renderSpinner.bind(this);
		this.getCharacters = this.getCharacters.bind(this);
	}

	componentDidMount() {
		this.getCharacters();
	}

	getCharacters() {
		const { characters } = this.state;

		this.api.getCharacters(characters.length).then(newCharacters => {
			this.setState({
				characters: [
					...characters,
					...newCharacters
				]
			});
		});
	}

	keyExtractor(item) {
		return item.id.toString();
	}

	renderFooter() {
		const { listFooterContainerStyle } = styles;

		return (
			<View style={listFooterContainerStyle}>
				{this.renderSpinner()}
			</View>
		);
	}

	renderSpinner() {
		const { spinnerContainerStyle } = styles;

		return (
			<View style={spinnerContainerStyle}>
				<ActivityIndicator
					size='large'
					color={COLORS.RED}
				/>
			</View>
		);
	}

	renderHero({ item, index }) {
		return (
			<Hero
				data={item}
				index={index}
				onPress={this.props.onPress}
			/>
		);
	}

	render() {
		const { containerStyle } = styles;

		const { characters } = this.state;
		const isLoading = characters.length === 0;

		if (isLoading) {
			return this.renderSpinner();
		}

		return (
			<FlatList
				data={characters}
				style={containerStyle}
				onEndReachedThreshold={0.5}
				renderItem={this.renderHero}
				onEndReached={this.getCharacters}
				keyExtractor={this.keyExtractor}
				ListFooterComponent={this.renderFooter}
			/>
		);
	}
}

const styles = StyleSheet.create({
	containerStyle: {
		flex: 1,
		width: '100%'
	},

	spinnerContainerStyle: {
		flex: 1,
		justifyContent: 'center',
	},

	listFooterContainerStyle: {
		paddingTop: 8,
		paddingBottom: 16
	}
});
