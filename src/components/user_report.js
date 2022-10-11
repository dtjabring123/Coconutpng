import React from "react";

export default class UserReport extends React.Component{
    //displays the details about a specific user under review
    handleClick = () =>{ //user is selected so update selected user variable from parent parent class
        this.props.method(this.props.data);
    }
    render(){
        return(
            <div onClick={this.handleClick}>
                <label>
              Ban ID :       {this.props.data.ban_id} ; 
              Date striked :     {this.props.data.date} ;
               User :      {this.props.data.user}
                </label>
            </div>
        )
    }
} 