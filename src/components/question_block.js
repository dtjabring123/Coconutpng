import React from "react";

export default function question_block(props){
    let title = props.props.title;
    let id = props.props.question_id;
    let likes = props.props.likes;
    let author = props.props.author;

  function handleClick(){} //create initial local onclick handler
    return(
        <div className="coloumn" onClick={handleClick=()=>{ //onClick for transfering page
            console.log(props.props.title);
        }}>
        <label>
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