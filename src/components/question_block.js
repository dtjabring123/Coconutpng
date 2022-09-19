import React from "react";
import "../stylesheets/comments.css";

export default function question_block(props){
    let title = props.props.title;
    let id = props.props.question_id;
    let likes = props.props.likes;
    let author = props.props.author;

  function handleClick(){} //create initial local onclick handler
    return(
        <div className="container" onClick={handleClick=()=>{ //onClick for transfering page
            console.log(props.props.title);
        }}>
            <div class="comment_container">
                <div className='comment_card'>
                    <h3>Title : {title}</h3>
                    <p>
                    
                    </p>
                    <div className='comment_card-footer'>
                        <div> Written by: {author}</div>
                        <div> Likes = {likes}</div>
                    </div>
                </div>

            </div>

        </div>

    )
}