import React from "react";
import "../stylesheets/comments.css";
import { tokens, components } from 'react-ui/themes/base'
import { ThemeProvider, Switch } from 'react-ui'
import { likeResponse } from "../utils/database_functions";

export default function ResponseBlock(props){
    //let date = props.props.date; //show
    let id = props.props.id;
    let likes = props.props.likes; //show likes
    let author = props.props.user; //show author
    let description = props.props.description; //show description
    let marked = props.props.marked;
    let question = props.props.question; //

    components.Switch = {
        colors: {
          backgroundOn: '#00f',
          backgroundOff: '#000'
        }
      }
    function handleLike(){
        let succ = likeResponse(1,props.props.id);
        Promise.resolve(succ).then((ret) =>{
            if(ret[0] == "success"){
                console.log("updated like");
            }
        })
    }

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
                        <ThemeProvider tokens={tokens} components={components}>
                            <Switch  onChange={()=>handleLike()}/>
                        </ThemeProvider>
                    </div>
                </div>

            </div>
    )
}