import * as React from 'react';
import { Component } from "react";
import { StyleSheet, TextInput, View, TextStyle, ViewStyle, Text } from "react-native";

export default class Input extends Component<{
	label?: string
	value?: string
	placeholder?: string
	onTextChange?: (value) => any
	autoFocus?: boolean
}, {}> {

	render() {
		const { placeholder, label, onTextChange, value, autoFocus } = this.props

		return (
			<View style={styles.container}>
				<Text style={styles.label}>
					{label}
				</Text>
				<TextInput
					style={styles.input}
					placeholder={placeholder}
					autoFocus={autoFocus}
					value={value}
					underlineColorAndroid="#3498db"
					onChangeText={(text) => (onTextChange || function () { })(text)}
				/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		padding: 10
	} as ViewStyle,
	label: {
		marginLeft: 3,
		fontSize: 14,
		fontWeight: 'bold',
		color: '#3498db',
	} as TextStyle,
	input: {
		height: 50,
		fontSize: 16,
	} as TextStyle,
});
