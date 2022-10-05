import React from "react";

export default class Report extends React.Component{

    state = {
        id : "",
        date : "",
        offence : "",
        question_id : "",
        response_id : ""
    }
    //displays specific report info
    render(){
        return(
            <div>
                <div  className="row">

                    <label>
                        {this.props.data.offence} ;
                    </label>
                </div>
            </div>
        )
    }
}