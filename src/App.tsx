import { StackNavigator } from 'react-navigation';
import TaskList from './screens/TaskList';
import TaskCreate from './screens/TaskCreate';
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
		screen: TaskCreate,
		path: 'create',
		navigationOptions: {
			title: 'New task'
		},
	},
	Edit: {
		screen: TaskEdit,
		path: 'edit/:id',
		navigationOptions: ({ navigation }) => ({
			title: `Edit task id ${navigation.state.params.id}`
		}),
	},
})