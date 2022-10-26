import React from "react";
import ReviewBlock from "./review_block";
import { changeReportStatus,changePostReportValue } from "../utils/database_functions";
import "../stylesheets/questiondetails.css"
export default class ReportReview extends React.Component{
    //handles a report being selected by the admin to view the full details of said report
    //handles user removing the selected question/response , admin must give a reason for removing question/response
    //handles user ignoring the selected report
   state = {
        reason : "" //store reason why question/response is removed
   }

   handleInput = (event) =>{ //updates reason variable when user inputs
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name] : value,
        })
    }
    output = (message) =>{ //output is given a message and displays a toast message of the input
        var x = document.getElementById("snackbar");
        x.className = "show";
        x.innerHTML = message;
        setTimeout(function () {
            x.className = x.className.replace("show", "");
        }, 3000);
    }

    handleRemove = () =>{
        //remove the selected reported question/report, the question/response will not appear any more for users
        if(this.state.reason == null | this.state.reason == ""){
            this.output("Please provide a reason for removal");
            return ;
        }
       var table;
       var post;
       var response_id = this.props.reportJSON.response_id;
       if((response_id == null) | (response_id == "")){
         table = 0;
         post = this.props.reportJSON.question_id;
       }else{
            table = 1;
            post = this.props.reportJSON.response_id;
       }
       var user = {role : 1}
       console.log(user);
       let succ = changePostReportValue(table,post,1,user,this.props.reportJSON.id);
       Promise.resolve(succ).then((ret) =>{
        if(ret == "success"){
            // user was given a strike, now close report
            let succ = changeReportStatus(this.props.reportJSON.id,1,this.state.reason)
            Promise.resolve(succ).then((ret)=>{
                if(ret == "success"){
                    if(table == 0){
                        this.output("Question removed");
                        
                    }else{
                        this.output("Response removed");
                    }
                    //set selected report back to null
                    this.props.method("");
                    //update list of reports
                    this.props.updateTable();
                    //reset reason
                    this.setState({reason : ""})
                }else{
                    this.output("Could not close report");
                }
            })
        }else{
            console.log(ret);
            if(table == 0){
                this.output("Could not remove question")
            }else{
                this.output("Could not remove response")
            }
            
        }
       })
    }
    handleIgnore = ()=>{ //used for ignoring selected report
        let succ = changeReportStatus(this.props.reportJSON.id,1,"")
        Promise.resolve(succ).then((ret)=>{
            if(ret == "success"){
                this.output("Report ignored");
                //set selected report back to null
                this.props.method("");
                //update list of reports
                this.props.updateTable();
            }else{
                this.output("Could not ignore report");
            }
        })
    }
    handleEnter = (event)=>{  // do nothing if enter key is pressed
        if(event.key == "Enter"){
            event.preventDefault();
        }
    }


    //else call db method, store values and then display returned vals inside if ret == success statement
    render(){
        if((this.props.reportJSON != "") && (this.props.reportJSON != null)){//if there is a selected report, display details about that report
            return(
                <div>
                    <div name = "snackbar" id = "snackbar"/>
                    <div>
                        <h1 className="report2">Reported Question/Response</h1>
                       <ReviewBlock data = {this.props.reportJSON}/>
                    </div>
                    <div className="report_box">
                    <input  className="input_report" name = "reason" id = "reason" type = "text" placeholder="Input reason for removing user..." onChange={evt=>this.handleInput(evt)} onKeyPress={this.handleEnter}/>
                    <input className="btn" id = "remove" type='submit' value = "Remove" onClick={this.handleRemove}/>
                    <input className="btn" id = "ignore" type = "button" value = "Ignore" onClick={this.handleIgnore}/>
                    </div>
                </div>
                   

            )
        }else{ // no report is selected
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