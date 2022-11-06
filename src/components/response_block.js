import React from "react";
import "../stylesheets/comments.css";
import { tokens, components } from 'react-ui/themes/base'
import { ThemeProvider, Switch } from 'react-ui'
import { likeResponse,changeMark,createReport } from "../utils/database_functions";
import { user } from "../utils/userDetails";
import CodeSegment from "./code_segment";
import markIcon from "../img/mark.png"
const tech={
    color:'green',
    backGroundImage: markIcon
}
export default class ResponseBlock extends React.Component{
    //shows details about a specific response
    //handles user interactions with the response
    state = { //store response's details
        id : "",
        likes : 0,
        author : "",
        description : "",
        marked : false,
        question : "",
        date : "",
        liked : 0
    }
    
    componentDidMount(){ //initialize components according to data given
         this.setState({description : this.props.props.description,
            author : this.props.props.user,
            likes : this.props.props.likes,
            id : this.props.props.id,
            marked : this.props.props.mark,
            question : this.props.props.question,
            date : this.props.props.date,
            liked : this.props.props.liked,
            code : this.props.props.code
           });
    //update like button to reflect database value
    components.Switch = {
        colors: {
          backgroundOn: '#00f',
          backgroundOff: '#000'
        }
      }
    }


    handleLike = () =>{ //handles user liking response
        var vote = 1;
        if(this.state.liked == 1){
            vote = 0;
        }
        let succ = likeResponse(vote,this.state.id);
        Promise.resolve(succ).then((ret) =>{
            if(ret[0] == "success"){
                var num = this.state.likes;
                if(vote == 0){
                    num = num -1;
                }else{
                    num = num + 1;
                }
                if(vote == "0"){
                    this.output("unliked response")
                }else{
                    this.output("liked response")
                }
                this.setState({likes :num,liked : vote });
            }
        })
    }
     handleMarkResponse = () =>{ //handles user marking a response as correct
        let userObj = {
            isQuestioner : this.props.data ,
            role : user.role
        }
        var val = 1;
        if(this.state.marked == 1){
            val = 0;
        }
        let succ = changeMark(val,this.state.id,userObj);
        Promise.resolve(succ).then((ret)=>{
            if(ret == "success"){
                if(val == 1){
                    this.output("marked as answer");
                }else{
                    this.output("unmarked as answer");
                }
                
            }
            else{
                this.output("could not change mark");
            }
        })
    }
    handleReport = () =>{ //handles user reporting the response
        let succ = createReport(this.state.question,this.state.id);
        Promise.resolve(succ).then((ret)=>{
            if(ret == "success"){
                this.output("response reported");
            }else{
                this.output("could not report response");
            }
        })
    }
     output = (message)=>{ //used to give a toast message
		var x = document.getElementById("snackbar");
		x.className = "show";
		x.innerHTML = message;
		setTimeout(function () {
			x.className = x.className.replace("show", "");
		}, 3000);
	}

render(){
    //default hide mark as answer button
    var visible_val = "hidden"
    if(this.props.data == true){
        visible_val = "visible"
    }
    //make liked button match user's liked status
    var flag = false;
    if(this.state.liked == 1){
        flag = true;
    }
    var marked = "Mark as Correct"
    if(this.state.marked == 1){
     marked = "Remove marked as Correct";
        
    }
    return(
        <div class="response_container">
           <div id = "snackbar" />
                <div className='response_card'>
                    <div className="mark-box">

                    <h3 className="head2" >Response by: {this.state.author}  { this.state.marked ==1 ? <img src={markIcon}
                   className="mark-icon" ></img>:""}
                        </h3>
                        <div className="report">
                            <input type = "button" id = "mark_btn" class="rep" onClick={() =>this.handleMarkResponse()} value={marked} style= {{ visibility : visible_val}}/>
                        </div> 
                    </div>
                    <p className="par">
                        {this.state.description}
                    </p>
                    <CodeSegment code = {this.state.code}/>
                    <div className='response_card-footer'>
                        <div><input type={"button"} value={"Report"} class="rep1" onClick={()=>this.handleReport()}/></div>
                        <div> Answered on: {this.state.date}  </div>
                        <div> {this.state.likes} Likes</div>
                        <ThemeProvider tokens={tokens} components={components}>
                            <Switch id={ this.state.id + "like_btn"} onChange={()=>this.handleLike()} checked={flag}/>
                        </ThemeProvider>
                        
                    </div>
                    
                </div>

            </div>
    )
}
}