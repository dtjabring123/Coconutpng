import React from "react";
import { displayReport } from "../utils/database_functions";
import DisplayReview from "./display_review.js";
export default class ReviewBlock extends React.Component{
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
                    this.setState({report_data : ret[1]});
                    this.processDisplayVals(ret[1]);
                }else{
                    console.log("Could not get report data");
                }
            })
        }
    }

    processDisplayVals = (array) =>{
     console.log(array);
        this.setState({question_info : array[0]})
        this.setState({response_info : array[1]});
    }
    render(){
        console.log(this.state);
        return(
            <div>
                <DisplayReview question_data = {this.state.question_info} response_data = {this.state.response_info}/>
            </div>
               
        )
    }

}