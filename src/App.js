import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	UIManager
} from 'react-native';

import HeroesList from './components/HeroesList';
import HeroDetail from './components/HeroDetail';

const INITIAL_STATE = {
	isDetailOpen: false,
	selectedHero: null,
	heroDimensions: null	
};

export default class App extends Component {

	constructor(props) {
		super(props);
		this.state = INITIAL_STATE;

		this.onHeroPress = this.onHeroPress.bind(this);
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
		} = this.state;

		return (
			<View style={styles.container}>
				<HeroesList onPress={this.onHeroPress} />
				
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
