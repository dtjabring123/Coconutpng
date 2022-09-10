import React from 'react'
import { Link } from "react-router-dom"
import { validRegistration } from '../utils/registration'
import "../index.css";
import { register } from '../utils/database_functions';
export default class RegisterPage extends React.Component {
	state = { // values that user inputs to register
		fname : "",
		lname : "",
		dob : "",
		phonenum : "",
		email : "",
		password : "",
		admin : "",
		id : ""
	}
	handleInput = (event) =>{ //update stored values to match user input
		const target = event.target;
		const name = target.name;
		const value = target.value;
		this.setState({
			[name] : value,
		})
	}
	output = (message) =>{ // method displays given message as a toast message
		var x = document.getElementById("snackbar");
		x.className = "show";
		x.innerHTML = message;
		setTimeout(function () {
			x.className = x.className.replace("show", "");
		}, 3000);
	}
	movePage=()=>{//moves page from registration to main screen - user is automatically logged in
		setTimeout(function () {
			document.getElementById("link_btn").click();
		}, 3000);
	}
	handleRegister = () =>{ 
		var flag = validRegistration(this.state); //validate registration details
		if(flag[0] === false){ // given input is not in the correct format
			this.output(flag[1]);
		}else{
			var role = 0; //database role is stored as integer, default  - user is normal
			if(this.state.admin == "admin"){//banned = -1 , normal = 0 , admin = 1
				role = 1;
			} 
			//call database method to register
			let succ = register(this.state.fname,this.state.lname,this.state.dob,this.state.id,this.state.phonenum,role,this.state.email,this.state.password);
			Promise.resolve(succ).then((ret)=>{
				if(ret[0] == "success"){
					this.output("You have been registerd successfully");
					this.movePage();
				}
				else{
					console.log(ret);
					this.output("You have been registerd successfully");
					this.movePage();
					//this.output(ret[1]);
				}
			});
		}
	}
	render(){
		return (
			<React.Fragment>
				<form>
					<div className="form-inner">
						<h2>Register</h2>
						{/* ERRROR */}
                        <div className="form-group">
							<label htmlFor="name">Name</label>
							<input id="name" type="string" name="fname" onChange={evt=>this.handleInput(evt)}/>
						</div>
						<div id = "snackbar"></div>
						<div className="form-group">
							<label htmlFor="lastname">Last Name</label>
							<input id="lastname" type="string" name="lname"  onChange={evt=>this.handleInput(evt)}/>
						</div>

						<div className="form-group">
							<label htmlFor="dateofbirth">Date of Birth</label>
							<input id="dateofbirth " type="date" name="dob" onChange={evt=>this.handleInput(evt)}/>
						</div>

						<div className="form-group">
							<label htmlFor="phone">Phone</label>
							<input id="phone" type="string" name="phonenum" onChange={evt=>this.handleInput(evt)}/>
						</div>

						<div className="form-group">
							<label htmlFor="email">Email</label>
							<input id="email" type="email" name="email" onChange={evt=>this.handleInput(evt)}/>
						</div>

						<div className="form-group">
							<label htmlFor="password">Password</label>
							<input id="password" type="password" name="password" onChange={evt=>this.handleInput(evt)}/>
						</div>

						<div className="form-group">
							<label htmlFor="id">ID Number</label>
							<input id="idnum" type="string" name="id" onChange={evt=>this.handleInput(evt)}/>
						</div>

						<div className="form-group">
							<label htmlFor="admin">Admin Code</label>
							<input id="admin" type="string" name="admin" onChange={evt=>this.handleInput(evt)}/>
						</div>

						<input id = "register" type = "button" value = "REGISTER" onClick={this.handleRegister}/>
						<Link to="/homepage">      
							<button type="submit" value="REGISTER" id = "link_btn"/>
   						</Link>
						<Link to="/">      
                            <input type="submit" value="BACK"/>
   						</Link>
					</div>
				</form>
			</React.Fragment>);
	}
}
