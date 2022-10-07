import React from "react";

export default class DisplayReview extends React.Component{

    render(){
        console.log(this.props);
        if(this.props.response_data == "" | this.props.response_data == null){
            return(
                <div>
                    <label>
                    Title:    {this.props.question_data.title}
                    </label>
                    <label>
                       Date :  {this.props.question_data.date}
                    </label>
                    <label>
                      Description:  {this.props.question_data.desc}
                    </label>
                    

                </div>
            )
        }
        else{
            return(
                <div>
  Reported response
                </div>
            )

        }

    }
}