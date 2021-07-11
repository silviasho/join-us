import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import routes from './appRouts/routs.config'
import './App.css';
import AppRoutes from './appRouts/routs'
import MainNavBarApp from '../src/customComponents/mainNavBar'



function App(props) {


	return (
		<div className="App">


			<BrowserRouter>
				<MainNavBarApp />
				<Switch>

					<AppRoutes routes={routes} />

				</Switch>
			</BrowserRouter>

		</div>
	)
}



export default App;
