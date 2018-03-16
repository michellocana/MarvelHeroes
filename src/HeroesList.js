import React, { Component } from 'react';
import {
	View,
	Text,
	ScrollView,
	StyleSheet,
	ActivityIndicator
} from 'react-native';

import Hero from './Hero';

import heroes from '../heroes.json';

export default class HeroesList extends Component {

	renderHeroes() {
		return heroes.map((hero, index) => (
			<Hero
				key={index}
				index={index}
				data={hero}
				onPress={this.props.onPress}
			/>
		));
	}

	render() {
		const { loading } = this.props;
		const {
			containerStyle,
			spinnerContainerStyle
		} = styles;

		if (loading) {
			return (
				<View style={spinnerContainerStyle}>
					<ActivityIndicator />
				</View>
			);
		}

		return (
			<ScrollView style={containerStyle}>
				{this.renderHeroes()}
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
