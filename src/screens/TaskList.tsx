import * as React from 'react';
import { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, FlatList, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
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
		await this.updateList()
	}

	async updateList() {
		const tasks = await Task.findAll()
		this.setState({
			tasks: tasks
		})
	}

	addTask(task: Task) {
		const tasks = this.state.tasks.map(t => t.id == task.id ? task : t)
		if (tasks.indexOf(task) == -1) tasks.push(task)
		this.setState({
			tasks: tasks
		})
	}

	async goToNewTask() {
		const { navigation } = this.props
		navigation.navigate('Create', { callback: task => this.addTask(task) })
	}

	async goToEditTask(task: Task) {
		const { navigation } = this.props
		navigation.navigate('Edit', { id: task.id, callback: task => this.addTask(task) })
	}

	render() {
		const { navigation } = this.props

		return (
			<View style={styles.container}>
				<FlatList
					data={this.state.tasks}
					keyExtractor={item => item.id}
					renderItem={({ item }) =>
						<TaskListItem task={item}
							onPress={task => this.goToEditTask(task)}>
						</TaskListItem>
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
