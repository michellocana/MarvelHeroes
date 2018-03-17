import React, { PureComponent } from 'react';
import { 
	View, 
	Text,
	StyleSheet,
	Animated
} from 'react-native';

import COLORS from '../constants/Colors';

export default class HeroDetailHeader extends PureComponent {

	constructor(props) {
		super(props);

		this.animatedOpacity = new Animated.Value();
		this.animatedOpacity.setValue(0);
	}

	componentWillReceiveProps({ visible }) {
		if (visible !== this.props.visible) {
			this.animate(visible);
		}
	}

	animate(visible) {
		Animated.timing(this.animatedOpacity, {
			toValue: visible ? 1 : 0,
			duration: 300
		}).start();
	}

	render() {
		const {
			headerTitleStyle,
			headerContainerStyle
		} = styles; 

		const { title } = this.props;

		const opacityStyle = {
			opacity: this.animatedOpacity.interpolate({
				inputRange: [0, 1],
				outputRange: [0, 1]
			})
		};

		if (!title) return null;

		return (
			<Animated.View 
				pointerEvents='none'
				style={[headerContainerStyle, opacityStyle]}
			>
				<Text
					numberOfLines={1}
					style={headerTitleStyle}
				>
					{title}
				</Text>
			</Animated.View>
		);
	}
}

const styles = StyleSheet.create({
	headerContainerStyle: {
		backgroundColor: COLORS.RED,
		elevation: 3,
		width: '100%',
		padding: 16,
		position: 'absolute',
		top: 0,
		left: 0,
		opacity: 0
	},

	headerTitleStyle: {
		fontSize: 16,
		color: COLORS.WHITE,
		fontWeight: 'bold'
	}
})