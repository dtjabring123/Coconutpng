import React from 'react'
import { Link } from "react-router-dom"
import { logOut } from '../database_functions';
export default class HomePage extends React.Component {
    handleLogout = () =>{
        var succ = logOut(); //if pass = failed = error else move to other screen
        Promise.resolve(succ).then((ret) =>{
            if(ret == "success"){
                this.output("Logged out");
            }else{
                this.output("Logout failed");
            }
        })
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
    <div>
        <h1>Welcome to the home page</h1>
        <div id = "snackbar"></div>
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