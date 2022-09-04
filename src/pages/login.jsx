import React from 'react'
import { Link } from "react-router-dom"
import { validLogin } from '../utils/login'
import { logIn } from '../utils/database_functions'
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
		if(valid[0] == true){
			//call db method
			let succ = logIn(this.state);
			Promise.resolve(succ).then((ret)=>{
				if(ret[0]){
					this.output("Login Success");
					//go to main screen
				}
				else{
					this.output("Email or password are incorrect");
				}
			} )
		
		}else{
			this.output(valid[1]);
		}
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
						<Link to="/homepage">      
							<input type="submit" value="LOGIN"/>
   						</Link>
					</div>
				</form>
			</React.Fragment>);
	}
}
