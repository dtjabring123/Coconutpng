import React from "react";
import { Link } from "react-router-dom";
import "../index.css";
import {validQuestion} from '../utils/createQuestion.js';
import {askQuestion} from '../utils/database_functions.js';
export default class createQuestion extends React.Component{

	state = { //store question title and question description for creating a question 
		title : "",
		description : "",
		file : null,
		code : ""
	}
	handleInput = (event) =>{ //updates email and password variables when user inputs
		const target = event.target;
		const name = target.name;
		const value = target.value;
		this.setState({
			[name] : value,
		})
	}
	handleFileChange = (event) =>{
		this.setState({file:event.target.files[0]});
	}

    handleQuestion = ()=>{
		if(validQuestion(this.state) == true){
			//call database method
			let succ = askQuestion(this.state.title,this.state.description,this.state.file,this.state.code);
			Promise.resolve(succ).then((ret)=>{
				if(ret== "success"){
					this.output("Question Posted");
					//go back to main screen
					this.movepage();
				}
				else{ // database error
					this.output("Error in posting question");
				}
			} )
		}else{
			this.output("Title cannot be empty");
		}
    }

    handleEnter = (event)=>{  // do nothing if enter key is pressed
        if(event.key == "Enter"){
            event.preventDefault();
        }
    }
	output = (message) =>{ //output is given a message and displays a toast message of the input
		var x = document.getElementById("snackbar");
		x.className = "show";
		x.innerHTML = message;
		setTimeout(function () {
			x.className = x.className.replace("show", "");
		}, 3000);
	}
	movepage = () =>{
		setTimeout(function () {
			document.getElementById("home_button").click();
		}, 3000);
	}

    render(){
        return (
            <React.Fragment>
                <form>
                    <div id = "snackbar"></div>
                    <div className="form-inner">
						<h2>Ask a Question</h2>
						<div className="form-group">
							<label htmlFor="title">Title</label>
							<input id="title" type="text" name="title" onChange={evt=>this.handleInput(evt)} onKeyPress={this.handleEnter} />
						</div>
						<div className="form-group">
							<label htmlFor="code">Add some code</label>
							
						</div>
						<div className="form-group">
							<label htmlFor="images">Add an image</label>
							<input id = "file" name = "file" type = "file" accept="image/*" onChange={evt=>this.handleFileChange(evt)}/>
						</div>
						<div className="form-group">
							<label htmlFor="description">Description</label>
							<textarea id= "description" name = "description" className="texta" placeholder="Ask your question" onChange={evt=>this.handleInput(evt)} onKeyPress={this.handleEnter}/>
						</div>

						<input id = "question" type = "button" value = "Submit" onClick={this.handleQuestion}/>
						<Link to="/homepage">      
							<button type="submit" value="Submit" id = "home_button"/>
   						</Link>
						<Link to="/homepage">      
                            <input type="submit" value="BACK"/>
   						</Link>
                        </div>
                </form>
            </React.Fragment>
        );
    }
}