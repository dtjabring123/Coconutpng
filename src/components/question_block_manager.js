import React from "react";
import "../stylesheets/default.css";
import Question_Block from "./question_block";
export default class QuestionBlockManager extends React.Component{
    //handles displaying a given list of questions or if a user that is banned
    render(){
        if(this.props.list == "you are banned"){
            //user is banned so give relevant message
            return(<div>
                <label className="text-white">
                    You are banned
                </label>
            </div>)
        }
        if(this.props.list.length > 0){
            return(
                <div>
                        <div className='container1'>
                            {/*displaying questions here*/}
                            {
                            this.props.list.map((question) =>{
                                    if((question.title != null) && (question.title != "")){
                                        return(<Question_Block props = {question} key = {question.question_id} />)
                                    }
                                })  
                            } 
                        </div>
                </div>
            )
        }
        else{
            //no questions have been received yet
            return(
                <div>
                    <label className="text-white">
                        No Questions to display
                    </label>
                </div>
            )
        }
    }
}