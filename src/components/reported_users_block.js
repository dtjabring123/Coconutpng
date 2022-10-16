import React from "react";
import { banUser,getAllBans,getBan } from "../utils/database_functions";
import ReportUserListManage from "./report_user_list_manager";
import ReportedUserDetails from "./reported_user_details";
export default class ReportedUsersBlock extends React.Component{
//will handle the admin being able to ban users with 3 or more stikes
    state = {
        user_list : "",
        selected_user : ""
    }
    componentDidMount(){
        //get list of users marked for review
        let succ = getAllBans();
        Promise.resolve(succ).then((ret)=>{
            if(ret[0] == "success"){
                this.setState({user_list : ret[1]})
            }else{
                console.log("could not get reported users list");
            }
        })
    }

    updateSelectedUser = (user)=>{ //used to update selected_user - is called by child components
        this.setState({selected_user : user});
    }

    render(){
        if(this.state.selected_user == ""  | this.state.selected_user == null){
            return(
                <div>
                    <h1 className="report3">Under Review</h1>
                    <ReportUserListManage data = {this.state.user_list} method = {this.updateSelectedUser}/>
                </div>
            )
        }else{
            return(
                <div>
                    <h1 className="report3">Under Review</h1>
                    <ReportUserListManage data = {this.state.user_list} method = {this.updateSelectedUser}/>
                    <ReportedUserDetails data = {this.state.selected_user} method = {this.updateSelectedUser} />
                </div>
            )  
        }


    }
}