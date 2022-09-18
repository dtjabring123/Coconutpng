import React from "react";

export default function question_block(props){
    console.log(props);
    let title = props.props.title;
    let id = props.props.question_id;
    let likes = props.props.likes;
    let author = props.props.author;
  function handleClick(){} //create initial local onclick handler
    return(
        <div className="coloumn">
        <label onClick={ handleClick = () =>{ //onclick for moving page to another page with more info on question
            console.log("clicked");
        }}>
        Title : {title}
        </label>
        <div className="row">
            <div>
             <label>
            by {author};
                </label>
            </div>
            <div>
                 <label>
                    Num likes = {likes}
                 </label>
            </div>
       
        </div>

        </div>

    )
}