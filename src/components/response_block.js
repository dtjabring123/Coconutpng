import React from "react";
import "../stylesheets/comments.css";
import { tokens, components } from 'react-ui/themes/base'
import { ThemeProvider, Switch } from 'react-ui'
import { likeResponse } from "../utils/database_functions";

export default class ResponseBlock extends React.Component{

    state = {
        id : "",
        likes : 0,
        author : "",
        description : "",
        marked : false,
        question : "",
        date : ""
    }
    componentDidMount(){
         this.setState({description : this.props.props.description,
            author : this.props.props.user,
            likes : this.props.props.likes,
            id : this.props.props.id,
            marked : this.props.props.mark,
            question : this.props.props.question
           });
    //update like button to reflect database value
    components.Switch = {
        colors: {
          backgroundOn: '#00f',
          backgroundOff: '#000'
        }
      }
    }
    handleLike = () =>{
        var like_lbl = document.getElementById("like_btn");
        console.log(like_lbl.checked);
        var option = like_lbl.checked;
        var vote;
        if(option == false){
            vote = 0;
        }else{
            vote = 1;
        }
        console.log(vote);
        let succ = likeResponse(vote,this.state.id);
        Promise.resolve(succ).then((ret) =>{
            if(ret[0] == "success"){
                console.log("updated like");
                var num_likes = this.state.likes;
                
                console.log(num_likes);
                if(vote == 0){
                    num_likes = num_likes - 1;
                }else{
                    num_likes = num_likes + 1;
                }
                
                this.setState({likes : num_likes});
            }
        })
    }

render(){
    return(
               <div class="response_container">
                <div className='response_card'>
                    <h3 className="head2">Response by: {this.state.author}</h3>
                    <p className="par">
                        {this.state.description}
                    </p>
                    <div className='response_card-footer'>
                        <div> Answered on:  </div>
                        <div> {this.state.likes} Likes</div>
                        <ThemeProvider tokens={tokens} components={components}>
                            <Switch id="like_btn" onChange={()=>this.handleLike()}/>
                        </ThemeProvider>
                    </div>
                </div>

            </div>
    )
}
}