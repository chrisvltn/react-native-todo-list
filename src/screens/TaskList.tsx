import * as React from 'react';
import { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { Task } from '../models/Task';
import TaskListItem from '../components/TaskListItem';

export default class TaskList extends Component<{ navigation: NavigationScreenProp<{}, {}> }, { tasks: Task[] }> {

	constructor(a, b) {
		super(a, b)
		this.state = { tasks: [] }
	}

	async componentDidMount() {
		await Task.prepare()
		this.setState({
			tasks: await Task.findAll()
		})
	}

	async goToNewTask() {
		const { navigation } = this.props
		navigation.navigate('Create')
	}

	render() {
		const { navigation } = this.props

		return (
			<View style={styles.container}>
				<FlatList
					data={this.state.tasks}
					keyExtractor={item => item.id}
					renderItem={({ item }) =>
						<TaskListItem task={item} navigation={navigation}></TaskListItem>
					}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
