import React from 'react'
import { Link } from "react-router-dom"

export default class RegisterPage extends React.Component {

	render(){
		return (
			<React.Fragment>
				<form>
					<div className="form-inner">
						<h2>Register</h2>
						{/* ERRROR */}
                        <div className="form-group">
							<label htmlFor="name">Name</label>
							<input id="name" type="string" name="name"/>
						</div>

						<div className="form-group">
							<label htmlFor="lastname">Last Name</label>
							<input id="lastname" type="string" name="lastname"/>
						</div>

						<div className="form-group">
							<label htmlFor="dateofbirth">Date of Birth</label>
							<input id="dateofbirth " type="date" name="dateofbirth"/>
						</div>

						<div className="form-group">
							<label htmlFor="phone">Phone</label>
							<input id="phone" type="string" name="password"/>
						</div>

						<div className="form-group">
							<label htmlFor="email">Email</label>
							<input id="email" type="email" name="email"/>
						</div>

						<div className="form-group">
							<label htmlFor="password">Password</label>
							<input id="password" type="password" name="password"/>
						</div>

						<div className="form-group">
							<label htmlFor="admin">Admin Code</label>
							<input id="admin" type="string" name="admin"/>
						</div>

						<Link to="/homepage">      
							<input type="submit" value="REGISTER" />
   						</Link>
					</div>
				</form>
			</React.Fragment>);
	}
}