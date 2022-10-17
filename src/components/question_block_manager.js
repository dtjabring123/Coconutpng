import React from "react";
import Question_Block from "./question_block";
export default class QuestionBlockManager extends React.Component{
    //handles displaying a given list of questions or a user that is banned
    render(){
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
            return(
                <div>
                    <label>
                        No Questions to display
                        You may be banned
                    </label>
                </div>
            )
        }
    }
}