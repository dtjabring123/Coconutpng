import React from 'react'
import { Link } from "react-router-dom"
import { validLogin } from '../utils/login.js'
import { logIn } from '../database_functions'
export default class LoginPage extends React.Component {
	state = {
		email : "",
		password : ""
	}
	handleInput = (event) =>{
		const target = event.target;
		const name = target.name;
		const value = target.value;
		this.setState({
			[name] : value,
		})
	}
	output = (message) =>{
		alert(message);
	}
	handleLogin = () =>{
		var valid = validLogin(this.state);
		if(true == true){
			//call db method
			let succ = logIn(this.state.email,this.state.password);
			Promise.resolve(succ).then((ret)=>{
				if(ret[0]){
					this.output("Login Success");
					//go to main screen
					this.movepage();
					
				}
				else{
					this.output("Email or password are incorrect");
				}
			} )

		
		}else{
			 this.output(valid[1]);
		}
	}

	movepage = ()  =>{
		document.getElementById("home_button").click();
	}

	render(){
		return (
			<React.Fragment>
				<form>
					<div className="form-inner">
						<h2>Login</h2>
						{/* ERRROR */}
						<div className="form-group">
							<label htmlFor="email">Email</label>
							<input id="email" type="email" name="email" onChange={evt=>this.handleInput(evt)}/>
						</div>

						<div className="form-group">
							<label htmlFor="password">Password</label>
							<input id="password" type="password" name="password" onChange={evt=>this.handleInput(evt)}/>
						</div>

						<input id = "login" type = "button" value = "LOGIN" onClick={this.handleLogin}/>
						<Link to="/homepage">      
							<input type="submit" value="LOGIN" id = "home_button"/>
   						</Link>
					</div>
				</form>
			</React.Fragment>);
	}
}
