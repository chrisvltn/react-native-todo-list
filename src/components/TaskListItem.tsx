import * as React from 'react';
import { Component } from "react";
import { View, Text, Switch, StyleSheet, ViewStyle, TextStyle, TouchableOpacity } from 'react-native';
import { Task } from "../models/Task";
import { NavigationScreenProp } from 'react-navigation';

export default class TaskListItem extends Component<{ navigation: NavigationScreenProp<{}, {}>, task: Task }, { task: Task }> {
	constructor(a, b) {
		super(a, b)
		this.state = {
			task: this.props.task
		}
	}

	changeDone(done: boolean) {
		const { task } = this.state
		task.done = done
		task.save()
		this.setState({ task: task })
	}

	openTask(task: Task) {
		const { navigation } = this.props
		navigation.navigate('Edit', { id: task.id })
	}

	render() {
		const { task } = this.state
		return (
			<View style={styles.container}>
				<TouchableOpacity style={styles.textView}
					onPress={() => this.openTask(task)}>
					<Text style={styles.title}
						numberOfLines={1}>
						{task.title}
					</Text>
					<Text style={styles.description}
						numberOfLines={1}>
						{task.description}
					</Text>
				</TouchableOpacity>
				<Switch
					style={styles.switchView}
					value={task.done}
					onValueChange={value => this.changeDone(value)} />
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		padding: 10,
		borderBottomColor: '#bdc3c7',
		borderBottomWidth: 1,
		flexWrap: 'nowrap',
	} as ViewStyle,
	textView: {
		flex: 1,
		flexDirection: 'column',
		marginRight: 10,
	} as ViewStyle,
	switchView: {
		width: 50,
		height: 30,
	} as ViewStyle,
	title: {
		fontWeight: 'bold',
		fontSize: 16,
	} as TextStyle,
	description: {
		fontSize: 14,
	} as TextStyle,
})
