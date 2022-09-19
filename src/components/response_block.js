import React from "react";
import "../stylesheets/comments.css";
export default function ResponseBlock(props){
    //let date = props.props.date; //show
    let id = props.props.id;
    let likes = props.props.likes; //show likes
    let author = props.props.user; //show author
    let description = props.props.description; //show description
    let marked = props.props.marked;
    let question = props.props.question; //

    return(
            <div class="response_container">
                <div className='response_card'>
                    <h3 className="head2">Response by: {author}</h3>
                    <p className="par">
                        {description}
                    </p>
                    <div className='response_card-footer'>
                        <div> Answered on:  </div>
                        <div> {likes} Likes</div>
                    </div>
                </div>

            </div>
    )
}