import React, { Component } from 'react';
import {
	Text,
	ScrollView
} from 'react-native';

import Hero from './Hero';

import heroes from '../heroes.json';

export default class HeroesList extends Component {

	renderHeroes() {
		return heroes.map((hero, index) => (
			<Hero
				key={index}
				data={hero}
				onPress={this.props.onPress}
			/>
		));
	}

	render() {
		return (
			<ScrollView style={{ flex: 1, width: '100%' }}>
				{this.renderHeroes()}
			</ScrollView>
		)
	}

}

