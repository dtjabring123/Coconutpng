import React from "react";
import { getBan } from "../utils/database_functions";
export default class ReportedUserDetails extends React.Component{
    state = {
        details : ""
    }
    componentDidMount(){
        if(this.props.data == null | this.props.data == ""){
            return;
        }
        let succ = getBan(this.props.data.ban_id);
        Promise.resolve(succ).then((ret)=>{
            console.log(ret);
            if(ret[0] == "success"){
                this.setState({details : ret[1]})
            }else{
                console.log("Could not get user details inside reporteduserdetails")
            }
        })
    }

    render(){
        if(this.props.ban_id != this.state.details.ban_id){
            this.componentDidMount();
        }
        if(this.props.data == null | this.props.data == ""){
            return(
                <div>
                    
                </div>
            )
        }else{
            if(this.state.details == "" | this.state.details == null){
                return(
                    <div>
                        <label>
                            Could not fetch details of user 
                        </label>
                    </div>
                )
            }else{
                return(
                    <div>
                        <label>
                            User details here:
                         Date:   {this.state.details.date};
                         Reason 1:   {this.state.details.reasons[0]};
                         Reason 2:   {this.state.details.reasons[1]};
                         Reason 3 :   {this.state.details.reasons[2]};
                         Username :    {this.state.details.user}
                        </label>
                    </div>
                )
        }
        }

    }
}