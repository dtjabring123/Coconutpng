import React from "react";
import "../stylesheets/comments.css";
import{Link,useNavigate} from 'react-router-dom';
export default function QuestionBlock(props){
    let title = props.props.title;
    let id = props.props.question_id;
    let likes = props.props.likes;
    let author = props.props.author;
    const navigate = useNavigate();

  function handleClick(){} //create initial local onclick handler
    return(
        <div className="container" onClick={handleClick=()=>{ //onClick for transfering page
            navigate('/questionInfo',{state:{id:1,name:id}});
            
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