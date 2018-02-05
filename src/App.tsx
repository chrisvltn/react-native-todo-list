import { StackNavigator } from 'react-navigation';
import TaskList from './screens/TaskList';
import TaskEdit from './screens/TaskEdit';

export default StackNavigator({
	List: {
		screen: TaskList,
		path: 'list',
		navigationOptions: {
			title: 'Task List',
		},
	},
	Create: {
		screen: TaskEdit,
		path: 'create',
		navigationOptions: {
			title: 'New task'
		},
	},
	Edit: {
		screen: TaskEdit,
		path: 'edit/:id',
		navigationOptions: {
			title: 'Edit task'
		},
	},
})