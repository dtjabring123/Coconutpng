import React from "react";
import { getBan,banUser } from "../utils/database_functions";

export default class ReportedUserDetails extends React.Component{
    //handles displaying the list of users under review for a ban
    // handles displaying the reasons why a user is under review
    //handles admin banning  a user
    state = {
        prev_user : "", // used to check if the selected user has changed
        details : "", // used to store the details of the selected user
        reason : "" // used to store the reason why a user will be banned
    }
    componentDidMount(){
        if(this.props.data == null | this.props.data == ""){
            return;
        }
        let succ = getBan(this.props.data.ban_id);
        Promise.resolve(succ).then((ret)=>{
            if(ret[0] == "success"){
                this.setState({details : ret[1]})
                this.setState({prev_user : this.props.data})
            }else{
                console.log("Could not get user details inside reporteduserdetails")
            }
        })
    }
	handleInput = (event) =>{ //updates email and password variables when user inputs
		const target = event.target;
		const name = target.name;
		const value = target.value;
		this.setState({
			[name] : value,
		})
	}
    handleBan=()=>{
        let ban_id = this.props.data.ban_id;
        let user_id = this.state.details.user;
        let reason = this.state.reason;
        if(reason.length>0){
            let succ = banUser(ban_id,user_id,reason);
            Promise.resolve(succ).then((ret)=>{
                if(ret == "success"){
                  this.output("User banned")
                  this.setState({reason : ""});
                  this.props.method("");
                }else{
                    this.output("Could not ban user");
                }
        })
        }else{
            this.output("Please provide a reason for the ban");
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

    
    handleEnter = (event)=>{  // call handleBan if enter key is pressed
        if(event.key == "Enter"){
            event.preventDefault();
			this.handleBan();
        }
    }
    render(){
        if(this.props.data.ban_id != this.state.prev_user.ban_id){
            this.componentDidMount();
        }
        if(this.props.data == null | this.props.data == ""){ //no user is selected
            return(
                <div>
                    <div name = "snackbar" id = "snackbar"/>
                    <label>
                        No user selected
                    </label>
                </div>
            )
        }else{
            if(this.state.details == "" | this.state.details == null){ //have not yet fetched selected user's details from database
                return(
                    <div>
                        <div name = "snackbar" id = "snackbar"/>
                        <label className="text-white">
                            Could not fetch details of user 
                        </label>
                     </div>
                )
            }else{ //have a seleceted user and their details from the database
                return(
                    <div className="right-box">
                    <div className="ban-box1">
                        
                        <div className="ban-info">
                          <p><b>User details:</b></p>
                        <p><b>Date:</b>  {this.state.details.date};</p>
                        <p><b>Reason 1:</b>    {this.state.details.reasons[0]}; </p>
                        <p><b>Reason 2:</b>    {this.state.details.reasons[1]}; </p>
                        <p><b>Reason 3:</b>    {this.state.details.reasons[2]}; </p>
                        <p><b>Username:</b>    {this.state.details.user} </p>
                        </div>

                        </div>
                        <div className="report_box1">
                            <input className="input_report" id="reason" name = "reason" placeholder="Input reason for banning user..."  onChange={evt=>this.handleInput(evt)} onKeyPress={this.handleEnter}/>
                            <input className="btn" value = "Ban User" type = "button" onClick={this.handleBan}/>
                        </div>
                        
                    </div>
                )
        }
        }

    }
}