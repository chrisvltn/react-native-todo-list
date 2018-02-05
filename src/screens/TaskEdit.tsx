import * as React from 'react';
import { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, KeyboardAvoidingView, ViewStyle } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { Task } from '../models/Task';
import Input from '../components/Input';

const instructions = Platform.select({
	ios: 'Press Cmd+R to reload,\n' +
		'Cmd+D or shake for dev menu',
	android: 'Double tap R on your keyboard to reload,\n' +
		'Shake or press menu button for dev menu',
});

export default class TaskEdit extends Component<{
	navigation: NavigationScreenProp<{
		params: {
			id: number,
			callback?: Function,
		}
	}, {}>,
}, { task: Task }> {

	constructor(a, b) {
		super(a, b)
		this.state = { task: Task.parse() }
	}

	async componentDidMount() {
		const { id } = this.props.navigation.state.params;
		if (!id) return;
		this.setState({
			task: await Task.findById(id)
		})
	}

	updateTask(task: Task, key: keyof Task, value: any) {
		task[key] = value
		task = Task.parse(task)
		this.setState({ task: task })
	}

	async saveTask(task: Task) {
		const { navigation } = this.props
		const { callback } = navigation.state.params
		await task.save()
		if (callback) setTimeout(() => callback(task), 1000)
		navigation.goBack()
	}

	render() {
		const { task } = this.state;

		return (
			<View style={styles.container}>
				<Input label="Title"
					value={task.title}
					autoFocus={true}
					placeholder="To do homework..."
					onTextChange={v => this.updateTask(task, 'title', v)}></Input>
				<Input label="Description"
					value={task.description}
					placeholder="Go home and do homework"
					onTextChange={v => this.updateTask(task, 'description', v)}></Input>

				<KeyboardAvoidingView style={styles.btnView}>
					<Button title="Salvar"
						onPress={() => this.saveTask(task)}></Button>
				</KeyboardAvoidingView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
	},
	btnView: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
	} as ViewStyle,
});
