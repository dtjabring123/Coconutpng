import React, { Component } from 'react';
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import Home from './component/home';
import About from './component/about';
import Contact from './component/contact';
import './App.css';

class App extends Component {
render() {
	return (
		<div className="App">
	<Router>
			<li>
				<Link to="/">Home</Link>
			</li>
			<li>
				<Link to="/about">About Us</Link>
			</li>
			<li>
				<Link to="/contact">Contact Us</Link>
			</li>
		<Routes>
				<Route  path='/' element={<Home/>}></Route>
				<Route  path='/about' element={<About/>}></Route>
				<Route  path='/contact' element={<Contact/>}></Route>
		</Routes>
		
	</Router>
	</div>
);
}
}

export default App;
