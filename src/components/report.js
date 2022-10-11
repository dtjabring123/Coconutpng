import React from "react";

export default class Report extends React.Component{

    //displays information about a specific report
    handleClick = () =>{
        //if clicked, set the selected report to this report's information
        this.props.method(this.props.data);
    }

    render(){
        return(
            <div onClick={this.handleClick}>
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