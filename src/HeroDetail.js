import React, { Component } from 'react';
import {
	Text,
	View,
	StyleSheet,
	Dimensions,
	Animated,
	Easing,
	ScrollView,
	Image,
	BackHandler
} from 'react-native';

const dimensions = Dimensions.get('window');
const windowWidth = dimensions.width;
const windowHeight = dimensions.height;

export default class HeroDetail extends Component {

	constructor(props) {
		super(props);

		this.state = {
			isScrollEnabled: false,
			didAnimationStart: false,			
			didAnimationEnd: false
		};

		this.animatedValue = new Animated.Value();
		this.animatedValue.setValue(0);

		this.onBackPress = this.onBackPress.bind(this);
		this.onAnimationEnd = this.onAnimationEnd.bind(this);
	}

	onAnimationEnd() {
		this.setState({
			isScrollEnabled: this.props.isShowingDetail,
			didAnimationStart: false,
			isAnimating: false
		});
	}

	componentDidMount() {
		BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
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
				duration: 300,
				easing: Easing.quad
			}).start(this.onAnimationEnd);
		});
	}

	renderImageOverlay() {
		const { heroDimensions, isShowingDetail } = this.props;

		const { didAnimationStart } = this.state;

		if (!didAnimationStart) return null;

		const { x, y, ...dimensions } = heroDimensions;

		return (
			<Animated.View
				style={{
					backgroundColor: 'green',
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
				source={{
					uri: selectedHero.image,
					width: windowWidth,
					height: heroDimensions.height
				}}
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
				{this.renderImageOverlay()}

				<Animated.View 
					style={[
						contentStyle,
						animatedTranslate
					]}
				>
					<ScrollView ref={ref => this.ScrollViewRef = ref }>
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
		backgroundColor: '#f8f8f8'
	},

	imageWrapperStyle: {
		width: '100%',
		height: 300
	},

	infoContainerStyle: {
		padding: 16
	},

	infoTextStyle: {
		fontSize: 18
	},

	infoTitleStyle: {
		fontWeight: 'bold',
		fontSize: 24
	}
});