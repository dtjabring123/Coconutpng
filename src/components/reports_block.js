import React from "react";
import { getAllReports } from "../utils/database_functions";
import ReportsBlockManager from "./reports_block_manager";
//handles the left half of reports page, where reports are displayed and admin can remove or ignore reported
//questions or comments, admin will give a  reason for why the question/response is removed
//when admin clicks on a reported question/report, more details displayed about the question and or response

export default class ReportsBlock extends React.Component{
    
    state = {
        reports_list : [], //will pass list of reports to reports manager
        reason : "" //store reason why question/response is removed
    }
    componentDidMount(){
        //fetch array of reports to display
        let succ = getAllReports();
        Promise.resolve(succ).then((ret)=>{
            if(ret[0] == "success"){
                console.log(ret[1]);
                this.setState({reports_list : ret[1]});
            }else{
                console.log("No reports given");
            }
        })
    }


    render(){
        return (
            <div>
                <label>
                    Report block
                </label>
                <ReportsBlockManager list = {this.state.reports_list}/>
                <input  id = "input_field"/>
            </div>
        )
    }
}