import React from "react";

export default class Report extends React.Component{

    //displays information about a specific report
    handleClick = () =>{
        this.props.method(this.props.data);
    }

    render(){
        return(
            <div  className="tester" onClick={this.handleClick}>
                {/* <table className = "table">
                        <tbody>
                            <tr>
                                <td>
                                    {this.props.data.date}
                                </td>
                                <td>
                                {this.props.data.offence}
                                </td>
                            </tr>
                        </tbody>
                    </table> */}
                  

                    <div className="grid-container">
                        <div className="grid-item">
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