import React from 'react'
import { Link } from "react-router-dom"

export default class HomePage extends React.Component {
render(){
    return (
    <div>
        <h1>Welcome User.....To the home page</h1>
        <div className="row">
            <Link to="/">      
                <button className='buttonstyle'
                    style={{marginTop:10, marginBottom:30}}>
                    Logout
                </button>
            </Link>
            <Link to="/profiles">      
                <button className='buttonstyle'
                    style={{marginTop:10, marginBottom:30}}>
                    Change Profile
                </button>
            </Link>
        </div>
    </div>);
	}
}