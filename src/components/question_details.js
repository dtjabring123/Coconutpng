import React from "react";
import { Link } from "react-router-dom";
import { createReport,likeQuestion,giveResponse_or_Comment } from "../utils/database_functions";
import { tokens, components } from 'react-ui/themes/base';
import { ThemeProvider, Switch } from 'react-ui'
export default class QuestionDetails extends React.Component{

    //displays a question's details in QuestionInfo.js page
    state = {
        details : "",
        question_id : "",
        answer : "",
        code : ""
    }
    componentDidMount(){
        this.setState({details : this.props.list})

    }
    componentDidUpdate(prevProps,prevState){
        if(prevProps.list != this.props.list){
            //update list
            this.setState({details : this.props.list, question_id : this.props.q_id});
            console.log(this.props);
        }
    }
     handleLike=()=>{ //handles user liking question
        //get like status
        var liked_lbl = document.getElementById("liked_btn");
        var option = liked_lbl.checked;
        //convert true/false like value to int value
        var vote;
        if(option == false){
            vote = 0;
        }else{
            vote = 1;
        }
        //use database method  
        let succ = likeQuestion(vote,this.state.question_id);
        Promise.resolve(succ).then((ret)=>{
            if(ret[0] == "success"){
                //call method again to change like value
            }
        })
    }

    handleReport = ()=>{ //handles reporting the question
        console.log("reporting question");
        console.log(this.state);
        let succ = createReport(this.state.question_id,null);
        Promise.resolve(succ).then((ret)=>{
            if(ret == "success"){
                this.output("Question reported");
            }else{
                this.output("Could not report question");
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

        handleInput = (event) =>{ //updates user's response
            const target = event.target;
            const name = target.name;
            const value = target.value;
            this.setState({
                [name] : value,
            })
        }
        handleResponseAdd=()=>{//handle user adding a response
            //check response given is not empty
            if((this.state.answer != null) && (this.state.answer.length > 0)){
                //call db method to add response
                let succ = giveResponse_or_Comment(0,this.state.question_id,this.state.answer,"");
                Promise.resolve(succ).then((ret)=>{
                    if((ret[0] == "success") | (ret == "success")){
                        this.output("Comment added successfully");
                        //setChangeResponseList(false);
                        var text_lbl = document.getElementById("answer");
                        text_lbl.value = "";

                    }else{
                        this.output("Failed to add response");
                    }
                })
            }else{
               this.output("Your comment cannot be empty");
            }
          }



    render(){
        if(this.state.details == ""){
            return(<div>
                <label>
                    Loading Details
                </label>
            </div>)
        }else{
        components.Switch = {
            colors: {
              backgroundOn: '#00f',
              backgroundOff: '#000'
            }
        }

        if(this.state.details.code == ""){
            return(
                <div>
                   
                    <label htmlFor="title" id = "title">{this.state.details.title}</label>
                <div className="report">
                    <ThemeProvider tokens={tokens} components={components}>
                        <Switch id= "liked_btn" onChange={()=>this.handleLike()} />
                    </ThemeProvider>
                </div>
                
                <div className="report"><input type={"button"} value = "Report" class="rep1" onClick={()=>this.handleReport()}/></div>
            
                <div className="q-group">
                    <label htmlFor="description">Description</label>
                    <textarea className="textab" id = "description" value={this.state.details.desc} readOnly/>
                </div>

                  <div className="q-group">
                  <div className= "image_div">
                    <img id = "image" name = "image" src = {this.state.details.images[0]}  />
                    </div>
                </div>
                <label htmlFor="description">Post Answer</label>
                <textarea id="answer" name = "answer" className="texta" placeholder="Type your answer here" onChange={evt=>this.handleInput(evt)} />
                <input id = "answer_btn" type = "button" value = "Submit" onClick={()=>this.handleResponseAdd()}/>
                <Link to="/homepage">      
                    <button type="submit" value="Submit" id = "home_button"/>
               </Link>
                </div>)
        }
            return(
                <div>
                    <label htmlFor="title" id = "title">{this.state.details.title}</label>
                <div className="report">
                
                    <ThemeProvider tokens={tokens} components={components}>
                        <Switch id= "liked_btn" onChange={()=>this.handleLike()} />
                    </ThemeProvider>
                </div>
                
                <div className="report"><input type={"button"} value = "Report" class="rep1" onClick={()=>this.handleReport()}/></div>
                
    
                <div className="q-group">
                    <label htmlFor="description">Description</label>
                    <textarea className="textab" id = "description" value={this.state.details.desc} readOnly/>
                </div>
                <div className="q-group">
                    <label htmlFor="description">Code</label>
                    <textarea  id = "code"  value = {this.state.details.code} readOnly/> 
                </div>
                  <div className="q-group">
                  <div className= "image_div">
                    <img id = "image" name = "image" src = {this.state.details.images[0]}  />
                    </div>
                </div>
                <label htmlFor="description">Post Answer</label>
                <textarea id="input_field" className="texta" placeholder="Type your answer here" onChange={evt=>this.handleInput(evt)} />
                <input id = "answer" type = "button" value = "Submit" onClick={()=>this.handleResponseAdd()}/>
                <Link to="/homepage">      
                    <button type="submit" value="Submit" id = "home_button"/>
               </Link>
                </div>
                
            )
        }
        
    }
}