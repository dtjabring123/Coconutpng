import React from 'react'
import { Link } from "react-router-dom"
import { updateUserDetails, getUserDetails} from '../database_functions';
import { validation } from '../utils/validation';
export default class ProfilePage extends React.Component {
	state = {
		fname : "",
		lname : "",
		dob : "",
		phone_num : "",
		password : "",
		id : "",
		admin : ""

	}
	handleInput = (event) =>{
		const target = event.target;
		const name = target.name;
		const value = target.value;
		this.setState({
			[name] : value,
		})
	}

	componentDidMount(){
		//initialise text fields here
		var user_details;
		var flag = false;
		//call db method to get user details
		let succ = getUserDetails();
	 	Promise.resolve(succ).then((ret)=>{
		 		if(ret[0] == "success"){
					user_details = ret[1];
					//update fields
					var name_lbl = document.getElementById("name");
					name_lbl.value = user_details.firstName;
					var lname_lbl = document.getElementById("lastname");
					lname_lbl.value = user_details.lastName;
					var dob_lbl = document.getElementById("dob_field");
					dob_lbl.value = user_details.DoB;
					var phonenum_lbl = document.getElementById("phone");
					phonenum_lbl.value = user_details.phoneNumber;
					if(user_details.role == 1){
					   var admin_lbl = document.getElementById("admin");
					   admin_lbl.value = "admin";
					}
					var email_lbl = document.getElementById("email");
					email_lbl.value = user_details.emailAddress;
		 		}
		 		else{
		 			alert("Log in credentials have expired. Please log in again");
		 		}
		 	} )
	}
	handleChanges=()=>{
		//updateuserdetails(json) - json = {first_name = , last_name = ,phoneNumber = }
		//changePassword(new_password)
		//
		//change password
		if(this.state.password != null && this.state.password.length > 0){
			//validate password
			if(validation.validPassword(this.state.password)){

			}else{
				alert("Password invalid");
			}
		}
		//validate firstname & last name
		
		//validate phoneNumber
		
	}
	render(){
		return (
			<React.Fragment>
				<form>
					<div className="form-inner">
						<h2>Profile</h2>
						{/* ERRROR */}
						<div className="form-group">
							<label htmlFor="name">Name</label>
							<input id="name" type="string" name="fname" onChange={evt=>this.handleInput(evt)}/>
						</div>

						<div className="form-group">
							<label htmlFor="lastname">Last Name</label>
							<input id="lastname" type="string" name="lastname" onChange={evt=>this.handleInput(evt)}/>
						</div>

						<div className="form-group">
							<label htmlFor="dateofbirth">Date of Birth</label>
							<input id="dob_field" type="date" name="dateofbirth" onChange={evt=>this.handleInput(evt)} readOnly={true}/>
						</div>

						<div className="form-group">
							<label htmlFor="phone">Phone</label>
							<input id="phone" type="string" name="phone" onChange={evt=>this.handleInput(evt)} readOnly={true}/>
						</div>

						<div className="form-group">
							<label htmlFor="email">Email</label>
							<input id="email" type="email" name="email" readOnly={true}/>
						</div>

						<div className="form-group">
							<label htmlFor="password">Password</label>
							<input id="password" type="password" name="password"/>
						</div>

						<div className="form-group">
							<label htmlFor="admin">Admin Code</label>
							<input id="admin" type="string" name="admin" onChange={evt=>this.handleInput(evt)} readOnly={true}/>
						</div>
                        <input type="submit" value="SAVE"/>
						<Link to="/homepage">      
                            <input type="submit" value="EXIT"/>
   						</Link>
					</div>
				</form>
			</React.Fragment>);
	}
}