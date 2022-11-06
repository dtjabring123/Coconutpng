import React from "react";
import { resetPassword } from "../utils/database_functions";
import { Link } from "react-router-dom";
import "../stylesheets/questiondetails.css"
export default class ForgotPassword extends React.Component{
    //handles user requesting to send an email to change their password
    state = {
        email : ""
    }

    handleInput = (event) =>{ //updates email variable
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
                    this.movepage(); // redirect back to mainpage
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

    handleEnter = (event)=>{  // call handlePassword if enter key is pressed
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
            <div className="forgot-box">
                <div className=" h-96  w-96  my-auto md:my-auto sm:my-auto xs:my-auto flex p-7 text-white flex-wrap justify-center  items-center  sm:w-80 bg-[#15161D] rounded-xl shadow-lg flex-col border-2 border-[#e7e7e77c]">
                <div id= "snackbar"></div>
                <label className="flex mx-auto py-3 text-lg md:text-base">
                    Enter your email address below:
                </label>
                <input type = "text" name = "email" id = "email" onChange={(evt)=>this.handleInput(evt)} onKeyPress={this.handleEnter}
                className="flex mx-auto my-3 py-2 px-16  rounded	 text-black pl-2"/>
                <button onClick={()=>this.handlePassword()}
                className="forgot-p">
                    Forgot Password
                </button>
                <Link to="/login">      
                    <input type="submit" value="BACK" className="mt-5 text-slate-50 cursor-pointer bg-[#505760] px-6 py-3 rounded-md"/>
   				</Link>
                <Link to="/">      
					<button type="submit" value="LOGIN" id = "login_button"/>
   				</Link>
                </div>
            </div>
        )
    }
}