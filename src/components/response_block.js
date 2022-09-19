import React from "react";
import "../stylesheets/comments.css";
export default function ResponseBlock(props){
    let date = props.props.title; //show
    let id = props.props.question_id;
    let likes = props.props.likes; //show likes
    let author = props.props.author; //show author
    let description = props.props.description; //show description
    let marked = props.props.marked;
    let question = props.props.question; //

    return(
        <div className="container2">
            <div class="response_container">
                <div className='response_card'>
                    <h3 className="head2">Response by: Me</h3>
                    <p className="par">
                    This form has the default HTML form behavior of browsing to a new page when the user submits the form. If you want this behavior in React, it just works. But in most cases, it’s convenient to have a JavaScript function that handles the submission of the form and has access to the data that the user entered into the form. The standard way to achieve this is with a technique called “controlled components”.
                    </p>
                    <div className='response_card-footer'>
                        <div> Answered on the: 12 Sep 2022 </div>
                        <div> 12 Likes</div>
                    </div>
                </div>

                <div className='response_card'>
                    <h3 className="head2">Response by: Me</h3>
                    <p className="par">
                    This form has the default HTML form behavior of browsing to a new page when the user submits the form. If you want this behavior in React, it just works. But in most cases, it’s convenient to have a JavaScript function that handles the submission of the form and has access to the data that the user entered into the form. The standard way to achieve this is with a technique called “controlled components”.
                    </p>
                    <div className='response_card-footer'>
                        <div> Answered on the: 12 Sep 2022 </div>
                        <div> 12 Likes</div>
                    </div>
                </div>

                <div className='response_card'>
                    <h3 className="head2">Response by: Me</h3>
                    <p className="par">
                    This form has the default HTML form behavior of browsing to a new page when the user submits the form. If you want this behavior in React, it just works. But in most cases, it’s convenient to have a JavaScript function that handles the submission of the form and has access to the data that the user entered into the form. The standard way to achieve this is with a technique called “controlled components”.
                    </p>
                    <div className='response_card-footer'>
                        <div> Answered on the: 12 Sep 2022 </div>
                        <div> 12 Likes</div>
                    </div>
                </div>

            </div>

        </div>
    )
}