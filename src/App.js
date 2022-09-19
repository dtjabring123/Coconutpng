import React, { Component } from 'react';
import { BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import WelcomePage from "./pages/mainscreen";
import HomePage from './pages/homepage';
import LoginPage from "./pages/login";
import RegisterPage from './pages/register';
import ProfilePage from './pages/profiles';
import CreateQuestion from './pages/createQuestion';
import QuestionDetails from './pages/questionDetails.jsx';

class App extends Component {
	render() {
		return (
			<div className="App">
		<Router>
			<Routes>
				<Route path="/" element={<WelcomePage/>}/>
				<Route path="/login" element={<LoginPage/>}/>
				<Route path="/homepage" element={<HomePage/>}/>
				<Route path="/register" element={<RegisterPage/>}/>
				<Route path="/profiles" element={<ProfilePage/>}/>
				<Route path = "/createQuestion" element={<CreateQuestion/>}/>
				<Route path = "/questionDetails" element={<QuestionDetails/>}/>
			</Routes>
			
		</Router>
		</div>
		);
	}
}

export default App;
