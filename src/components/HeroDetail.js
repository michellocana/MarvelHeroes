import React, { Component, Fragment } from 'react';
import {
	Text,
	View,
	StyleSheet,
	Dimensions,
	Animated,
	Easing,
	ScrollView,
	Image,
	BackHandler,
	StatusBar
} from 'react-native';
import _ from 'lodash';

import Api from '../utils/Api';
import COLORS from '../constants/Colors';
import HeroComicList from '../components/HeroComicList';
import HeroDetailHeader from '../components/HeroDetailHeader';

const dimensions = Dimensions.get('window');
const windowWidth = dimensions.width;
const windowHeight = dimensions.height - StatusBar.currentHeight;

const INITIAL_STATE = {
	isScrollEnabled: false,
	didAnimationStart: false,			
	didAnimationEnd: false,
	headerOpacity: 0
};

export default class HeroDetail extends Component {

	static HEADER_THRESHOLD = 400;

	constructor(props) {
		super(props);

		this.state = INITIAL_STATE;

		this.animatedValue = new Animated.Value();
		this.animatedValue.setValue(0);

		this.onBackPress = this.onBackPress.bind(this);
		this.onAnimationEnd = this.onAnimationEnd.bind(this);
		this.onScrollViewScroll = this.onScrollViewScroll.bind(this);
	}

	componentDidMount() {
		BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
	}

	onAnimationEnd() {
		this.setState({
			isScrollEnabled: this.props.isShowingDetail,
			didAnimationStart: false,
			isAnimating: false
		});
	}

	onBackPress() {
		if (this.props.isShowingDetail) {
			this.ScrollViewRef.scrollTo({
				y: 0
			});

			setTimeout(() => this.prepareAnimaton(false), 100);

			return true;
		}

		return false;
	}

	componentWillReceiveProps({ isShowingDetail }) {	
		this.prepareAnimaton(isShowingDetail);		
	}

	prepareAnimaton(isShowingDetail) {
		this.setState({
			didAnimationStart: true,
			isAnimating: true
		}, () => {			
			Animated.timing(this.animatedValue, {
				toValue: isShowingDetail ? 1 : 0,
				duration: 400,
				easing: Easing.quad
			}).start(this.onAnimationEnd);
		});
	}

	onScrollViewScroll({ nativeEvent }) {
		const { y } = nativeEvent.contentOffset;

		const isHeaderVisible = y > HeroDetail.HEADER_THRESHOLD;

		this.setState({ isHeaderVisible });
	}

	renderHeader() {
		const { selectedHero } = this.props;
		const { isHeaderVisible } = this.state;

		if (selectedHero) {
			return (
				<HeroDetailHeader 
					visible={isHeaderVisible}
					title={selectedHero.name}
				/>
			);
		}

		return null;
	}

	renderComics() {
		const { infoSubtitleStyle } = styles;
		const { selectedHero } = this.props;

		if (selectedHero.comics.items.length) {
			return (
				<Fragment>
					<Text style={infoSubtitleStyle}>
						Appears on:
					</Text>

					<HeroComicList 
						data={selectedHero.comics.items} 
					/>
				</Fragment>
			);
		}

		return null;		
	}

	renderImageOverlay() {
		const { heroDimensions, isShowingDetail } = this.props;

		const { didAnimationStart } = this.state;

		if (!didAnimationStart) return null;

		const { x, y, ...dimensions } = heroDimensions;

		return (
			<Animated.View
				style={{
					position: 'absolute',
					zIndex: 2,
					top: this.animatedValue.interpolate({
						inputRange: [0, 1],
						outputRange: [y, 0]
					}),
					left: this.animatedValue.interpolate({
						inputRange: [0, 1],
						outputRange: [x, 0]
					}),
					width: this.animatedValue.interpolate({
						inputRange: [0, 1],
						outputRange: [dimensions.width, dimensions.width + (x * 2)]
					}),
					height: dimensions.height
				}}
			>
				{this.renderImage()}
			</Animated.View>
		);
	}

	renderImage() {
		const { heroDimensions, selectedHero } = this.props;

		if (!heroDimensions) return null;

		return (
			<Image
				style={{
					width: windowWidth,
					height: 300
				}}
				source={selectedHero.image}
			/>
		);
	}

	renderContent() {
		const { selectedHero } = this.props;

		if (!selectedHero) return null;
		
		const { 
			infoContainerStyle,
			infoTextStyle,
			infoTitleStyle			
		} = styles;

		return (
			<View style={infoContainerStyle}>
				<Text style={infoTitleStyle}>
					{selectedHero.name}
				</Text>

				<Text style={infoTextStyle}>
					{selectedHero.description}
				</Text>

				{this.renderComics()}
			</View>
		)
	}

	render () {
		const { 
			selectedHero, 
			isShowingDetail,
			heroDimensions
		} = this.props;

		const { 
			containerStyle,
			contentStyle, 
			contentActiveStyle,
			scrollViewContentStyle,
			imageWrapperStyle
		} = styles;

		const { isAnimating } = this.state;

		const animatedTranslate = {
			transform: [
				{ 
					translateY: this.animatedValue.interpolate({
						inputRange: [0, 1],
						outputRange: [windowHeight, 0]
					})
				}
			]
		};

		return (
			<View style={containerStyle}>
				{this.renderHeader()}
				
				{this.renderImageOverlay()}

				<Animated.View 
					style={[
						contentStyle,
						animatedTranslate
					]}
				>
					<ScrollView 
						onScroll={this.onScrollViewScroll}
						ref={ref => this.ScrollViewRef = ref }
					>
						<View style={imageWrapperStyle}>
							{!isAnimating && this.renderImage()}							
						</View>

						{this.renderContent()}
					</ScrollView>
				</Animated.View>
			</View>
		);

	}

}

const styles = StyleSheet.create({	
	containerStyle: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%'
	},

	contentStyle: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: windowHeight,
		backgroundColor: COLORS.GRAY
	},

	imageWrapperStyle: {
		width: '100%',
		height: 300
	},

	infoContainerStyle: {
		padding: 16
	},

	infoTextStyle: {
		fontSize: 18,
		color: COLORS.BLACK
	},

	infoTitleStyle: {
		fontSize: 32,
		color: COLORS.BLACK,
		fontWeight: 'bold'
	},

	infoSubtitleStyle: {
		marginTop: 16,
		fontSize: 24,
		fontWeight: 'bold',
		color: COLORS.BLACK
	}
});