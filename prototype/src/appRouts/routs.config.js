import MainScreen from '../screens/mainScreen';
import ProfileScreen from '../screens/myProfileScreen'
import UserProfileScreen from '../screens/userProfileScreen';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AddJoinEventScreen from '../screens/addJoinEventScreen'
import RegisterToApp from '../screens/registerToApp'
import LoginToApp from '../screens/loginToApp'
import AddEventApp from '../screens/addEventScreenApp'

const routes = [
	{
		exact: true,
		private: false,
		isAdmin: false,
		path: '/mainScreen',
		component: MainScreen
	},
	{
		exact: true,
		private: false,
		isAdmin: false,
		path: '/registerApp',
		component: RegisterToApp
	},
	{
		exact: true,
		private: false,
		isAdmin: false,
		path: '/',
		component: LoginToApp
	},
	{
		exact: true,
		private: false,
		isAdmin: false,
		path: '/userProfileScreen',
		component: UserProfileScreen
	},
	{
		exact: true,
		private: false,
		isAdmin: false,
		path: '/profileScreen',
		component: ProfileScreen
	},
	
	{
		exact: true,
		private: false,
		isAdmin: false,
		path: '/addJoinEventApp',
		component: AddEventApp
	},
];


export default routes