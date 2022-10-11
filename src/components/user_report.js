import React from "react";

export default class UserReport extends React.Component{

    handleClick = () =>{
        this.props.method(this.props.data);
    }
    render(){
        return(
            <div className="right-box" onClick={this.handleClick}>
                <div className="ban-box1">
                    <div className="ban-info">
             <p><b>Ban ID:</b>  {this.props.data.ban_id}</p>
             <p><b>Date striked:</b>  {this.props.data.date}</p>
             <p><b>User:</b>   {this.props.data.user}</p> 
                </div>
                </div>
            </div>
        )
    }
} 