import React from "react";

export default class Report extends React.Component{

    //displays information about a specific report
    handleClick = () =>{
        this.props.method(this.props.data);
    }

    render(){
        return(
            <div onClick={this.handleClick}>
                <div>
                    <table className = "table">
                        <thead>
                            <th>Date</th>
                            <th>Offence</th>
                        </thead>
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
                    </table>
                </div>
            </div>
        )
    }
}