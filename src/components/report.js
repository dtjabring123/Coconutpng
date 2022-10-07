import React from "react";

export default class Report extends React.Component{

    //displays specific report info
    handleClick = () =>{
        console.log("clicked");
        this.props.method(this.state.question_id,this.state.response_id);
    }

    render(){
        return(
            <div onClick={this.handleClick=()=>{
               this.props.method(this.props.data);
            }}>
                <div  className="row">
                    <label>
                        {this.props.data.date};
                    </label>
                    <label>
                        {this.props.data.offence}
                    </label>
                </div>
            </div>
        )
    }
}