import React from "react";
import { displayReport } from "../utils/database_functions";
export default class ReviewBlock extends React.Component{
    state = {
        question_info : "",
        response_info : ""
    }

    componentDidMount(){
        console.log(this.props);
        let succ = displayReport(this.props.data);
        Promise.resolve(succ).then((ret)=>{
            if(ret[0] == "success"){
                console.log(ret);

            }else{
                console.log("Could not get report data");
            }
        })
    }

    render(){
    return(
        <div>

        </div>
    )
    }
}