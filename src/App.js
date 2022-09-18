import React, { Component } from 'react';
import { BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import WelcomePage from "./pages/mainscreen";
import HomePage from './pages/homepage';
import LoginPage from "./pages/login";
import RegisterPage from './pages/register';
import ProfilePage from './pages/profiles';
import Navbar from './components/navbar';

class App extends Component {
	render() {
		return (
			<div className="App">
		<Router>
			<Routes>
				<Route path="/login" element={<LoginPage/>}/>
			</Routes>
			<div className='naVbar'>
				<Navbar/>
				<Routes>
					<Route path="/" element={<WelcomePage/>}/>
					<Route path="/homepage" element={<HomePage/>}/>
				</Routes>
				<div className='helo'>
					<Routes>
						<Route path="/register" element={<RegisterPage/>}/>
						<Route path="/profiles" element={<ProfilePage/>}/>
					</Routes>
				</div>
			</div>
			
		</Router>
		</div>
		);
	}
}

export default App;
