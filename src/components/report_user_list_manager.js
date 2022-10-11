import React from "react";
import UserReport from "./user_report";
export default class ReportUserListManage extends React.Component{

    render(){
        try {
            return(
                <div>
                    {this.props.data.map((row)=>{
                        return(
                            <UserReport data = {row} method = {this.props.method} key = {row.ban_id}/>
                        )
                    } )}
                </div>
            ) 
        } catch (error) {
            return(
                <div>
                    <label>
                        No reported users
                    </label>
                </div>
            )
        }


    }
}