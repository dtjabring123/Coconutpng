import React, { Component } from 'react';
import { BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import WelcomePage from "./pages/mainscreen";
import HomePage from './pages/homepage';
import LoginPage from "./pages/login";
import RegisterPage from './pages/register';
import ProfilePage from './pages/profiles';

class App extends Component {
	render() {
		return (
			<div className="App">
		<Router>
			<Routes>
				<Route path="/mainscreen" element={<WelcomePage/>}/>
				<Route path="/login" element={<LoginPage/>}/>
				<Route path="/homepage" element={<HomePage/>}/>
				<Route path="/register" element={<RegisterPage/>}/>
				<Route path="/profiles" element={<ProfilePage/>}/>
			</Routes>
			
		</Router>
		</div>
		);
	}
}

export default App;
