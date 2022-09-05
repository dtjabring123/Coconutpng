import React from 'react'
import { Link } from "react-router-dom"
import { updateUserDetails, getUserDetails,changePassword} from '../database_functions';
import { validation } from '../utils/validation';
export default class ProfilePage extends React.Component {
	state = {
		firstname : null,
		lastname : null,
		phone : null,
		password : null,
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
		 			this.output("Log in credentials have expired. Please log in again");
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
				let succ = changePassword(this.state.password);
				Promise.resolve(succ).then((ret)=>{
					if(ret[0] == "success"){
						this.output("Password changed successfully");
					}else{
						this.output("Couldn't change password");
					}
				})
			}else{
				this.output("Password Password must be between 6 and 15 characters long inclusive.\n Password should contain at least 1 uppercase letter, 1 lowercase letter and 1 number \n");
			}
		}
		
		var flag = true;
		var error = "";
		var json = {
			first_name : this.state.fname,
			last_name : this.state.lastname,
			phoneNumber : this.state.phone
		}
		
		//validate firstname
		if((json.first_name != null) && (json.first_name.length > 0)){
			if(!validation.validName(json.first_name)){
				json.first_name = null;
				error = "Names should only contain alphabetical characters and not be empty \n";
				flag = false;
			}
		}else{
			json.first_name = null;
		}
		//validate lastname
		if((json.last_name != null) && (json.last_name.length > 0)){
			if(!validation.validName(json.last_name)){
				json.last_name = null;
				if(flag == false){
					error = "Names should only contain alphabetical characters and not be empty \n";
				}
				
			}
		}else{
			json.last_name = null;
		}
		//validate phoneNumber
		if((json.phoneNumber != null) && (json.phoneNumber.length > 0)){
			if(!(validation.validPhoneNum(json.phoneNumber))){
				json.phoneNumber = null;
				error = error + "Phone numbers should be 10 or 13 characters long and only contain numbers or a single  '+' \n";
			}
		}else{
			json.phoneNumber = null;
		}
		flag = true;
		if(  ((json.first_name == null)  && (json.last_name == null)) && (json.phoneNumber == null) ){
			flag = false;
		}
		if(flag){ //call db method to change details
			let succ = updateUserDetails(json);
			Promise.resolve(succ).then((ret)=>{
					this.output("Details changed successfully");
			 })
		}else{
			this.output(error);
		}
	}
	output = (message) =>{
		var x = document.getElementById("snackbar");
		x.className = "show";
		x.innerHTML = message;
		setTimeout(function () {
			x.className = x.className.replace("show", "");
		}, 5000);
	}
	render(){
		return (
			<React.Fragment>
				<form>
					<div className="form-inner">
					<div id = "snackbar"></div>
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
							<input id="phone" type="string" name="phone" onChange={evt=>this.handleInput(evt)}/>
						</div>

						<div className="form-group">
							<label htmlFor="email">Email</label>
							<input id="email" type="email" name="email" readOnly={true}/>
						</div>

						<div className="form-group">
							<label htmlFor="id">ID Number</label>
							<input id="idnum" type="string" name="id" onChange={evt=>this.handleInput(evt)}/>
						</div>

						<div className="form-group">
							<label htmlFor="password">Password</label>
							<input id="password" type="password" name="password" onChange={evt=>this.handleInput(evt)}/>
						</div>

						<div className="form-group">
							<label htmlFor="admin">Admin Code</label>
							<input id="admin" type="string" name="admin" onChange={evt=>this.handleInput(evt)} readOnly={true}/>
						</div>
                        <input type="button" value="SAVE" onClick={this.handleChanges}/>
						<Link to="/HomePage">      
                            <input type="submit" value="BACK"/>
   						</Link>
					</div>
				</form>
			</React.Fragment>);
	}
}