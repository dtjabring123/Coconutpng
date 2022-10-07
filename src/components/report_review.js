import React from "react";

import ReviewBlock from "./review_block";
export default class ReportReview extends React.Component{
 
    //if reportJSON is not empty -> if report id != stored reportJSON id then call db method
    //else call db method, store values and then display returned vals inside if ret == success statement
    render(){
        console.log(this.props);
        if((this.props.reportJSON != "") && (this.props.reportJSON != null)){
            return(
                <div>
                    <label>
                        Here is the report info
                       <ReviewBlock data = {this.props.reportJSON}/>
                    </label>
                </div>
            )
        }else{
            return(
                <div>
                <label>
                    No report selected
                </label>
                </div>
            )
        }

    }
}