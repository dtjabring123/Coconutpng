import React from "react";

export default class Report extends React.Component{

    //displays specific report info
    handleClick = () =>{
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