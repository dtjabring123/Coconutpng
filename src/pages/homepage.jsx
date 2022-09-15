import React from 'react'
import { Link } from "react-router-dom"
import { logOut } from '../utils/database_functions';
import "../stylesheets/default.css";
export default class HomePage extends React.Component {
    handleLogout = () =>{  // method handles user trying to log out
        var succ = logOut(); //call database method to log out
        Promise.resolve(succ).then((ret) =>{
            if(ret === "success"){
                this.output("Logged out");
            }else{
                this.output("Logout failed");
            }
        })
    }
	output = (message) =>{ // method displays given message as a toast message
		var x = document.getElementById("snackbar");
		x.className = "show";
		x.innerHTML = message;
		setTimeout(function () {
			x.className = x.className.replace("show", "");
		}, 5000);
	}

render(){
    return (
    <div class="area" >
        <ul class="circles">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
        </ul>
    <div class="context">
        <h1>Welcome To the Home Page</h1>
        <div class="row">
        <div id = "snackbar"></div>
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
            <Link to="/createQuestion">
                <button className='buttonstyle'
                    style={{marginTop:10,marginBottom:30}}>
                        Ask a Question
                    </button>
            </Link>
        </div>
    </div>
    </div>);
	}
}
