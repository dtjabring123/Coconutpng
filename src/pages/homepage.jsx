import React from 'react'
import { Link } from "react-router-dom"
import { logOut } from '../database_functions';
export default class HomePage extends React.Component {
    handleLogout = () =>{
        var succ = logOut(); //if pass = failed = error else move to other screen
        Promise.resolve(succ).then((ret) =>{
            if(ret == "success"){
                alert("Logged out");
            }else{
                alert("Logout failed");
            }
        })
    }
render(){
    return (
    <div>
        <h1>Welcome User.....To the home page</h1>
        <div className="row">
            <Link to="/">      
                <button className='buttonstyle' onClick={this.handleLogout}
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