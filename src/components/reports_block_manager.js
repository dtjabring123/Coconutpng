import React from "react";
import Report from "./report";
//handles displaying reported questions/responses in a list
// will be able to handle the array of reports being emtpy
export default class ReportsBlockManager extends React.Component{

    render(){
        let arr=  this.props.list;
        if(arr.length != 0){ //generate list of reports if the array is not empty
            return(
                <div>
                    <label>
                        Date ; Offence ; Question ID ; Response ID
                    </label>
                    {this.props.list.map((report)=>{
                        return( <Report data = {report} key={report.id} method = {this.props.method}/> )
                    } )}
                </div>
            )
        }else{ // list of reports is empty 
            return(
                <div>
                    <label>
                        No reports
                    </label>
                </div>
            )
        }


    }

}