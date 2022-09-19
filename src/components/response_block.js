import React from "react";
import "../stylesheets/comments.css";
import { tokens, components } from 'react-ui/themes/base'
import { ThemeProvider, Switch } from 'react-ui'

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
                            <Switch />
                        </ThemeProvider>
                    </div>
                </div>

            </div>
    )
}