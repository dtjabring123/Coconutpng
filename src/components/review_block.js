import React from "react";
import { displayReport } from "../utils/database_functions";
import DisplayReview from "./display_review.js";
export default class ReviewBlock extends React.Component{
    //handles passing the correct data to be displayed 
    //is given the reportJSON to be used in the database function to get the full report details
    state = {
        report_data : "",
        question_info : "",
        response_info : ""
    }  

    componentDidMount(){
        if(this.props.data == null | this.props.data == ""){
        }else{
            let succ = displayReport(this.props.data);
            Promise.resolve(succ).then((ret)=>{
                if(ret[0] == "success"){
                    this.setState({report_data : this.props.data});
                    this.processDisplayVals(ret[1]);
                }else{
                    console.log("Could not get report data");
                }
            })
        }
    }

    processDisplayVals = (array) =>{
        this.setState({question_info : array[0]})
        this.setState({response_info : array[1]});
    }
    render(){
        if(this.props.data.id != this.state.report_data.id){ // selected report has changed so update displayed details
            this.componentDidMount();
        }
        return(
            <div>
                <DisplayReview question_data = {this.state.question_info} response_data = {this.state.response_info}/>
            </div>   
        )
    }

}