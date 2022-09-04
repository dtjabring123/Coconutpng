import React from 'react'
import { Link } from "react-router-dom"

export default class WelcomePage extends React.Component {
  render(){
		return (
		<div>
			<h1>Welcome to Coconut Overflow!</h1>
      <div className="row">
      <Link to="/login">      
        <button className='buttonstyle'
            style={{marginTop:10, marginBottom:30}}>
            Login
        </button>
    </Link>
    <Link to="/Register">      
        <button className='buttonstyle'
            style={{marginTop:10, marginBottom:30}}>
            Register
        </button>
    </Link>
      </div>
    
		</div>);
	}
  
}

