import React from "react";

export default class DisplayReview extends React.Component{
    //displays the report's details, if a question is reported : display only the question's details
    // if a response is reported: display both the response and the question containing the response details
    render(){
        if(this.props.response_data == "" | this.props.response_data == null){ //question is reported ,so display question details
            return(
                <div>
                    <label name = "title">
                    Title:    {this.props.question_data.title}
                    </label>
                    <label name = "date">
                       Date :  {this.props.question_data.date}
                    </label>
                    <label name = "description">
                      Description:  {this.props.question_data.desc}
                    </label>
                </div>
            )
        }
        else{ //response is reported, display both the response details and the question the response is in
            return(
                <div>
  Reported response
                    <label name= "question_title">
                      Title:    {this.props.question_data.title}
                    </label>
                    <label name = "question_date">
                       Date :  {this.props.question_data.date}
                    </label>
                    <label name = "question_description">
                      Description:  {this.props.question_data.desc}
                    </label>
                    <label>
                        Response data here
                    </label>
                    <label name = "response_date">
                        Date : {this.props.response_data.date}
                    </label>
                    <label name = "response_description">
                        Description :  {this.props.response_data.desc}
                    </label>
                    <label name = "response_author">
                        Posted by : {this.props.response_data.user_id}
                    </label>

                </div>
            )

        }

    }
}