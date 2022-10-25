import React from 'react'
import { Link } from "react-router-dom"
import { validLogin } from '../utils/login.js'
import { logIn } from '../utils/database_functions'
import { setUser } from '../utils/userDetails.js'
import '../index.css'; 
export default class LoginPage extends React.Component {
	state = { //store email and password to be used to login 
		email : "",
		password : ""
	}
	handleInput = (event) =>{ //updates email and password variables when user inputs
		const target = event.target;
		const name = target.name;
		const value = target.value;
		this.setState({
			[name] : value,
		})
	}
	output = (message) =>{ //output is given a message and displays a toast message of the input
		var x = document.getElementById("snackbar");
		x.className = "show";
		x.innerHTML = message;
		setTimeout(function () {
			x.className = x.className.replace("show", "");
		}, 3000);
	}
	handleLogin = () =>{  //validate login details first
		var valid = validLogin(this.state);
		if(valid[0] == true){
			//call database method
			let succ = logIn(this.state.email,this.state.password);
			Promise.resolve(succ).then((ret)=>{
				if(ret[0] == "success"){
					this.output("Login Success");
					//go to main screen
					setUser(ret[1]);
					this.movepage();
				}
				else{
					this.output("Email or password are incorrect");
				}
			} )
		}else{
			this.output(valid[1]); // database error
		}
	}
	

	handleEnter = (event)=>{  // do nothing if enter key is pressed
        if(event.key == "Enter"){
            event.preventDefault();
			this.handleLogin();
        }
    }

	movepage = ()  =>{ //transition page after toast is displayed
		setTimeout(function () {
			document.getElementById("home_button").click();
		}, 3000);
	}
	render(){
		return (
			<React.Fragment>
				<form>
					<div className='h-full'>

					<div id ="snackbar"></div>
					<div className=''>
					<div className="flex p-7  flex-wrap justify-center   md:w-96 bg-[#15161D] sm:w-80 rounded-xl shadow-lg flex-col border-2 border-[#e7e7e77c]">
						<h2 className='text-center text-[#ebebeb] font-bold my-6 text-4xl'>Login</h2>
						{/* ERRROR */}
						<div className=' flex flex-col justify-around h-32 align-middle  m-auto '>
						<div className=" flex justify-between w-[100%]">
							<label htmlFor="email" className=' text-[#ebebeb] justify-self-end text-lg mx-3'>Email</label>
							<input id="email" type="email" name="email" onChange={evt=>this.handleInput(evt)}  onKeyPress={this.handleEnter}
							className="bg-[#e0e0e0] w-auto  justify-self-center "/>
						</div>

						<div className="flex justify-between  w-[100%]">
							<label htmlFor="password" className=' text-[#ebebeb] text-lg mx-3'>Password</label>
							<input id="password" type="password" name="password" onChange={evt=>this.handleInput(evt)}  onKeyPress={this.handleEnter}
							className="bg-[#e0e0e0] w-auto  justify-self-center"/>
						</div>
						</div>

						<input id = "login" type = "button" value = "LOGIN" onClick={this.handleLogin}
						className="w-80 py-3 text-[#131419] cursor-pointer my-5 bg-[#ABACAB] rounded-lg font-extrabold"/>
						<Link to="/register">      
                            <input type="submit" value="Register" 
																												className='w-80 py-3 text-[#fffffffd] cursor-pointer bg-[#CC1150] rounded-lg font-extrabold'/>
   						</Link>
						<Link to="/forgotPassword">      
                            <input type="submit" value="Forgot Password"
																												className='text-[#8A8989] text-lg cursor-pointer py-5'/>
   						</Link>

						{ <Link to="/homepage">      
							<button type="submit" value="LOGIN" id = "home_button"/>
   						</Link>}
						<Link to="/">      
                            <input type="submit" value="BACK" className=' text-slate-50 cursor-pointer bg-[#505760] px-6 py-3 rounded-md'/>
   						</Link>
					</div>
					</div>
					</div>
				</form>
			</React.Fragment>);
	}
}
