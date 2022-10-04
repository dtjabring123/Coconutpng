import React from "react";
import "../stylesheets/comments.css";
import { tokens, components } from 'react-ui/themes/base'
import { ThemeProvider, Switch } from 'react-ui'
import { likeResponse,changeMark,createReport } from "../utils/database_functions";
import { user } from "../utils/userDetails";

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
    componentDidMount(){ //initialize components according to data given
         this.setState({description : this.props.props.description,
            author : this.props.props.user,
            likes : this.props.props.likes,
            id : this.props.props.id,
            marked : this.props.props.mark,
            question : this.props.props.question
           });
           //update like switch to reflect if user has liked or not before
           var like_lbl = document.getElementById(this.state.id + "like_btn");
           if(this.props.props.liked == 1 ){
            like_lbl.checked = true;
           }
          // hide mark as correct button if user is not the questioner
           if(this.props.data == false){
            var mark_lbl = document.getElementById(this.state.id + "mark_btn");
            mark_lbl.style.visibility = "hidden";
        }
           


    //update like button to reflect database value
    components.Switch = {
        colors: {
          backgroundOn: '#00f',
          backgroundOff: '#000'
        }
      }
    }
    handleLike = () =>{ //handles user liking response
        var like_lbl = document.getElementById(this.state.id + "like_btn");
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
     handleMarkResponse = () =>{ //handles user marking a response as correct
        let userObj = {
            isQuestioner : this.props.data ,
            role : user.role
        }
        let succ = changeMark(1,this.state.id,userObj);
        Promise.resolve(succ).then((ret)=>{
            if(ret == "success"){
                this.output("marked as answer");
            }
            else{
                this.output("could not mark answer");
            }
        })
    }
    handleReport = () =>{
        let succ = createReport(this.state.id,this.state.question);
        Promise.resolve(succ).then((ret)=>{
            if(ret == "success"){
                this.output("response reported");
            }else{
                this.output("could not report response");
            }
        })
    }
     output = (message)=>{ //output is given a message and displays a toast message of the input
		var x = document.getElementById("snackbar");
		x.className = "show";
		x.innerHTML = message;
		setTimeout(function () {
			x.className = x.className.replace("show", "");
		}, 3000);
	}

render(){
    var mark_id = this.state.id + "mark_btn";
    return(
               <div class="response_container">
           <div id = "snackbar" />
                <div className='response_card'>
                    <h3 className="head2">Response by: {this.state.author}      
                        <input type = "button" id = {mark_id} onClick={() =>this.handleMarkResponse()} value="Mark as Correct" />
                        </h3>
                    <p className="par">
                        {this.state.description}
                    <input type={"button"} value={"Report"} onClick={()=>this.handleReport()}/>
                    </p>

                    <div className='response_card-footer'>
                        <div> Answered on:  </div>
                        <div> {this.state.likes} Likes</div>
                        <ThemeProvider tokens={tokens} components={components}>
                            <Switch id={ this.state.id + "like_btn"} onChange={()=>this.handleLike()}/>
                        </ThemeProvider>
                    </div>
                  
                </div>

            </div>
    )
}
}