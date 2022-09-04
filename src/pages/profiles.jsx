import React from 'react'
import { Link } from "react-router-dom"
import { updateUserDetails, getUserDetails} from '../database_functions';
export default class ProfilePage extends React.Component {
	state = {
		fname : "",
		lname : "",
		dob : "",
		phone_num : "",
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

	//DoB: 
    //firstName:
	//lastName: 
	//phoneNumber: 
	//emailAddress: 
	//role: 
	//titles: 
	componentDidMount(){
		//initialise text fields here
		var user_details;
		var flag = false;
		//call db method
		let succ = getUserDetails();
	 	Promise.resolve(succ).then((ret)=>{
		 		if(ret[0] == "success"){
		 			user_details = ret[1]
					user_details.fname = ret[1].firstName;
					user_details.lname = ret[1].lastname;
					user_details.dob = ret[1].Dob;
					user_details.phone_num = ret[1].phoneNumber;
					
					console.log("Success")
					console.log(ret[1]);
					flag = true;
		 		}
		 		else{
		 			console.log(ret);
		 		}
		 	} )
	//	console.log(user_details);
		//change text fields
		if(flag == false){
			user_details = {firstName : "test", lastName : "test"};
		}
		// console.log(user_details);
		// var name_lbl = document.getElementById("name");
		// name_lbl.value = user_details.firstName;
		// var lname_lbl = document.getElementById("lastname");
		// lname_lbl.value = user_details.lastName;
		// var dob_lbl = document.getElementById("dateofbirth");
		// dob_lbl.value = "2000-07-13";

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
							<input id="dateofbirth " type="date" name="dateofbirth" onChange={evt=>this.handleInput(evt)}/>
						</div>

						<div className="form-group">
							<label htmlFor="phone">Phone</label>
							<input id="phone" type="string" name="password" onChange={evt=>this.handleInput(evt)}/>
						</div>

						<div className="form-group">
							<label htmlFor="email">Email</label>
							<input id="email" type="email" name="email" readOnly={true}/>
						</div>

						<div className="form-group">
							<label htmlFor="password">Password</label>
							<input id="password" type="password" name="password" readOnly={true}/>
						</div>

						<div className="form-group">
							<label htmlFor="admin">Admin Code</label>
							<input id="admin" type="string" name="admin" onChange={evt=>this.handleInput(evt)}/>
						</div>
                        <input type="submit" value="SAVE"/>
						<Link to="/homepage">      
                            <button type="submit" value="EXIT"/>
   						</Link>
					</div>
				</form>
			</React.Fragment>);
	}
}