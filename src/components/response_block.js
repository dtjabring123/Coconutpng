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
        <div>
            <label>{description}</label>
        </div>
    )
}