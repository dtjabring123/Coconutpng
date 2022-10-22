import React from "react";
import { resetPassword } from "../utils/database_functions";
import { Link } from "react-router-dom";
export default class ForgotPassword extends React.Component{

    state = {
        email : ""
    }

    handleInput = (event) =>{ //updates email
		const target = event.target;
		const name = target.name;
		const value = target.value;
		this.setState({
			[name] : value,
		})
	}
    handlePassword = ()=>{
        
        if(this.state.email.length > 0){
            let succ = resetPassword(this.state.email);
			Promise.resolve(succ).then((ret)=>{
				if(ret == "success"){
					this.output("An email has been sent to your email address");
                    this.movepage();
				}
				else{
					this.output("Could not send an email to email address.\n Email may not be registered");
				}
            })
        }
        else{
            this.output("Email address cannot be empty");
        }

    }

    output = (message) =>{ //output is given a message and displays a toast message of the input
		var x = document.getElementById("snackbar");
		x.className = "show";
		x.innerHTML = message;
		setTimeout(function () {
			x.className = x.className.replace("show", "");
		}, 3000);
	}

    handleEnter = (event)=>{  // do nothing if enter key is pressed
        if(event.key == "Enter"){
            event.preventDefault();
			this.handlePassword();
        }
    }

	movepage = ()  =>{ //transition page after toast is displayed
		setTimeout(function () {
			document.getElementById("login_button").click();
		}, 3000);
	}


    render(){
        return(
            <div>
                <div id  = "snackbar"></div>
                <label>
                    Enter your email address here
                </label>
                <input type = "text" name = "email" id = "email" onChange={(evt)=>this.handleInput(evt)} onKeyPress={this.handleEnter}/>
                <button onClick={()=>this.handlePassword()}>
                    Forgot Password
                </button>
                <Link to="/login">      
                    <input type="submit" value="BACK"/>
   				</Link>

                <Link to="/">      
					<button type="submit" value="LOGIN" id = "login_button"/>
   				</Link>
            </div>
        )
    }
}