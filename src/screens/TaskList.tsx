import * as React from 'react';
import { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { Task } from '../models/Task';

const instructions = Platform.select({
	ios: 'Press Cmd+R to reload,\n' +
		'Cmd+D or shake for dev menu',
	android: 'Double tap R on your keyboard to reload,\n' +
		'Shake or press menu button for dev menu',
});

export default class TaskList extends Component<{ navigation: NavigationScreenProp<{}, {}> }, { tasks: Task[] }> {

	constructor(a, b) {
		super(a, b)
		this.state = { tasks: [] }
	}

	async componentDidMount() {
		await Task.prepare()
	}

	goToTaskCreate() {
		const { navigate } = this.props.navigation;
		navigate('Create')
	}

	goToTaskEdit() {
		const { navigate } = this.props.navigation;
		navigate('Edit', { id: 12 })
	}

	async insertTask() {
		const random = (n = 10000) => (Math.round(Math.random() * 10000) % n)
		const task = Task.parse({
			title: 'Task X' + random(),
			description: 'My Task description' + random(),
			done: !!random(1),
		})
		await task.save()
		this.setState({
			tasks: [
				...this.state.tasks,
				task
			]
		})
	}

	async getTasks() {
		const tasks = await Task.findAll()
		this.setState({
			tasks: tasks
		})
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>
					Welcome to React Native!
					Task List Page
				</Text>
				<Button title="Go to Task Create Page" onPress={() => this.goToTaskCreate()} />
				<Button title="Go to Task Edit Page" onPress={() => this.goToTaskEdit()} />

				<Button title="Insert a task" onPress={() => this.insertTask()} />
				<Button title="Get all tasks" onPress={() => this.getTasks()} />

				<Text style={styles.instructions}>
					To get started, edit App.js
        		</Text>
				<Text style={styles.instructions}>
					{instructions}
				</Text>

				<FlatList
					data={this.state.tasks}
					keyExtractor={item => item.id}
					renderItem={({ item }) =>
						<Text>{item.title}</Text>
					}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5,
	},
});
