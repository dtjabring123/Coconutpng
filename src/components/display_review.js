import React from "react";

export default class DisplayReview extends React.Component{
    //displays the report's details, if a question is reported : display only the question's details
    // if a response is reported: display both the response and the question containing the response details
    render(){
        if(this.props.response_data == "" | this.props.response_data == null){ //question is reported ,so display question details
            return(
                <div>
                    <div className="report_card">
                        <h3>
                            Question data here:
                        </h3>
                        <div>
                        <b>Title:</b> {this.props.question_data.title}
                        </div>
                        <div>
                        <b>Description:</b> {this.props.question_data.desc}
                        </div>
                        <div className="report_card-footer">
                        Date: {this.props.question_data.date}
                        </div>
                        
                    </div>
                </div>
            )
        }
        else{ //response is reported, display both the response details and the question the response is in
            return(
                <div>
                    <div className="report_card">
                    <h3>
                        Question data here:
                    </h3>
                    <div>
                    <b>Title:</b>  {this.props.question_data.title}
                    </div>
                    <div>
                     <b>Description:</b>  {this.props.question_data.desc}
                    </div>
                    <div className="report_card-footer">
                       Date : {this.props.question_data.date}
                    </div>
                    
                </div>

                    <div>
                        <div className="report_card">
                            <h3>
                                Response data here:
                            </h3> 
                            <div>
                              <b>Description:</b>   {this.props.response_data.desc}
                            </div>

                            <div>
                                <div className="report_card-footer">Posted by: {this.props.response_data.user_id}</div>
                                <div className="report_card-footer">Date: {this.props.response_data.date}</div>
                            </div>
                            
                           
                            
                        </div>
                    </div>
            </div>
            )

        }

    }
}