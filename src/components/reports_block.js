import React from "react";
import { getAllReports } from "../utils/database_functions";
import ReportsBlockManager from "./reports_block_manager";
import ReportReview from "./report_review";
//handles the left half of reports page, where reports are displayed and admin can remove or ignore reported
//questions or comments
//when admin clicks on a reported question/report, more details displayed about the question and or response

export default class ReportsBlock extends React.Component{
    
    state = {
        reports_list : [], //will pass list of reports to reports manager
        reportJSON : ""
    }
    componentDidMount(){
        //fetch array of reports to display
        let succ = getAllReports();
        Promise.resolve(succ).then((ret)=>{
            if(ret[0] == "success"){
                this.setState({reports_list : ret[1]});
            }else{ // no questions/responses reported
            }
        })
    }
    setData = (obj) =>{ //set question id and response id to selected report
        this.setState({reportJSON : obj});
    }

    renderAgain = () =>{
        this.componentDidMount();
    }

    render(){
        return (
            <div>
                <label>
                    Report block
                </label>
                {/*display list of reports */}
                <ReportsBlockManager list = {this.state.reports_list} method = {this.setData}/>
                {/*display selected report information */}
                <ReportReview reportJSON = {this.state.reportJSON} method = {this.setData} updateTable = {this.renderAgain}/>
            </div>
        )
    }
}