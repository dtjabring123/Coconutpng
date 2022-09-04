import React from 'react'
import { Link } from "react-router-dom"

export default class LoginPage extends React.Component {

	render(){
		return (
			<React.Fragment>
				<form>
					<div className="form-inner">
						<h2>Login</h2>
						{/* ERRROR */}
						<div className="form-group">
							<label htmlFor="email">Email</label>
							<input id="email" type="email" name="email"/>
						</div>

						<div className="form-group">
							<label htmlFor="password">Password</label>
							<input id="password" type="password" name="password"/>
						</div>
						<Link to="/homepage">      
							<input type="submit" value="LOGIN"/>
   						</Link>
					</div>
				</form>
			</React.Fragment>);
	}
}
