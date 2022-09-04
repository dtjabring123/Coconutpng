import React from 'react'
import { Link } from "react-router-dom"
import { validRegistration } from '../utils/registration'
import "../index.css";
//import { register } from '../utils/database_functions';
export default class RegisterPage extends React.Component {
	state = {
		fname : "",
		lname : "",
		dob : "",
		phone_num : "",
		email : "",
		password : "",
		admin : "",
		id : ""
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
	handleRegister = () =>{
		console.log(this.state);
		var flag = validRegistration(this.state);
		if(flag[0] === false){
			this.output(flag[1]);
		}else{
			//call db method to register
			var role = 0;
			if(this.state.admin !== "admin"){
				role = 1;
			}
			// let succ = register(this.state.fname,this.state.lname,this.state.dob,this.state.id,this.state.phone_num,role,this.state.email,this.state.password);
			// Promise.resolve(succ).then((ret)=>{
			// 	if(ret[0] == "success "){
			// 		this.outpu("Register success");
			// 	}
			// 	else{
			// 		this.output(ret[1]);
			// 	}
			// });
			this.output("Register success");
			document.getElementbyId("link_btn").click();
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
							<input id="phone" type="string" name="phone_num" onChange={evt=>this.handleInput(evt)}/>
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
							 <input type="submit" id = "link_btn" value="MAINSCREEN" />
   						</Link>
					</div>
				</form>
			</React.Fragment>);
	}
}