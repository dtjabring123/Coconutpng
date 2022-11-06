import React from "react";

export default class Report extends React.Component{

    //displays information about a specific report
    handleClick = () =>{
        //if clicked, set the selected report to this report's information
        this.props.method(this.props.data);
    }

    render(){
        return(
            <div  className="tester" onClick={this.handleClick}>
                    <div className="grid-container cursor-pointer">
                        <div className="grid-item cursor-pointer">
                           
                        {this.props.data.date}
                        </div>
                        <div className="grid-item">
                        {this.props.data.offence}
                        </div>
                    </div>
            </div>
        )
    }
}