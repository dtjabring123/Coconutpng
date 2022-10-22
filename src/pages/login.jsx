import React from 'react'
import { Link } from "react-router-dom"
import { validLogin } from '../utils/login.js'
import { logIn } from '../utils/database_functions'
import { setUser } from '../utils/userDetails.js'
import '../index.css'; 
export default class LoginPage extends React.Component {
	state = { //store email and password to be used to login 
		email : "",
		password : ""
	}
	handleInput = (event) =>{ //updates email and password variables when user inputs
		const target = event.target;
		const name = target.name;
		const value = target.value;
		this.setState({
			[name] : value,
		})
	}
	output = (message) =>{ //output is given a message and displays a toast message of the input
		var x = document.getElementById("snackbar");
		x.className = "show";
		x.innerHTML = message;
		setTimeout(function () {
			x.className = x.className.replace("show", "");
		}, 3000);
	}
	handleLogin = () =>{  //validate login details first
		var valid = validLogin(this.state);
		if(valid[0] == true){
			//call database method
			let succ = logIn(this.state.email,this.state.password);
			Promise.resolve(succ).then((ret)=>{
				if(ret[0] == "success"){
					this.output("Login Success");
					//go to main screen
					setUser(ret[1]);
					this.movepage();
				}
				else{
					this.output("Email or password are incorrect");
				}
			} )
		}else{
			this.output(valid[1]); // database error
		}
	}
	

	handleEnter = (event)=>{  // do nothing if enter key is pressed
        if(event.key == "Enter"){
            event.preventDefault();
			this.handleLogin();
        }
    }

	movepage = ()  =>{ //transition page after toast is displayed
		setTimeout(function () {
			document.getElementById("home_button").click();
		}, 3000);
	}

	render(){
		return (
			<React.Fragment>
				<form>
					<div id = "snackbar"></div>
					<div className="form-inner">
						<h2>Login</h2>
						{/* ERRROR */}
						<div className="form-group">
							<label htmlFor="email">Email</label>
							<input id="email" type="email" name="email" onChange={evt=>this.handleInput(evt)}  onKeyPress={this.handleEnter}/>
						</div>

						<div className="form-group">
							<label htmlFor="password">Password</label>
							<input id="password" type="password" name="password" onChange={evt=>this.handleInput(evt)}  onKeyPress={this.handleEnter}/>
						</div>

						<input id = "login" type = "button" value = "LOGIN" onClick={this.handleLogin}/>
						<Link to="/register">      
                            <input type="submit" value="Register"/>
   						</Link>
						<Link to="/forgotPassword">      
                            <input type="submit" value="Forgot Password"/>
   						</Link>

						<Link to="/homepage">      
							<button type="submit" value="LOGIN" id = "home_button"/>
   						</Link>
						<Link to="/">      
                            <input type="submit" value="BACK"/>
   						</Link>
					</div>
				</form>
			</React.Fragment>);
	}
}
