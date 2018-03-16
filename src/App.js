import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	UIManager
} from 'react-native';

import Api from './Api';
import HeroesList from './HeroesList';
import HeroDetail from './HeroDetail';

const INITIAL_STATE = {
	isDetailOpen: false,
	selectedHero: null,
	heroDimensions: null,
	characters: []
};

export default class App extends Component {

	constructor(props) {
		super(props);
		this.state = INITIAL_STATE;

		this.onHeroPress = this.onHeroPress.bind(this);
	}

	componentDidMount() {
		const api = new Api();

		api.getCharacters().then(characters => {
			this.setState({ characters });
		});
	}

	componentWillMount() {
		// Enabling LayoutAnimation on Android
		if (UIManager.setLayoutAnimationEnabledExperimental) {
			UIManager.setLayoutAnimationEnabledExperimental(true);
		}
	}

	onHeroPress(hero, dimensions) {
		this.setState({
			selectedHero: hero,
			heroDimensions: dimensions,
			isShowingDetail: true
		});
	}

	render() {
		const {
			selectedHero,
			isShowingDetail,
			heroDimensions,
			characters
		} = this.state;

		const isLoading = characters.length === 0;

		return (
			<View style={styles.container}>
				<HeroesList
					data={characters}
					loading={isLoading}
				/>

				<HeroDetail
					selectedHero={selectedHero}
					isShowingDetail={isShowingDetail}
					heroDimensions={heroDimensions}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: '#f8f8f8',
	}
});
