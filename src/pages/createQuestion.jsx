import React from "react";
import { Link } from "react-router-dom";
import "../index.css";
export default class createQuestion extends React.Component{

	state = { //store question title and question description for creating a question 
		title : "",
		description : ""
	}
	handleInput = (event) =>{ //updates email and password variables when user inputs
		const target = event.target;
		const name = target.name;
		const value = target.value;
		this.setState({
			[name] : value,
		})
	}

    handleQuestion = ()=>{

    }

    handleEnter = (event)=>{  // do nothing if enter key is pressed
        if(event.key == "Enter"){
            event.preventDefault();
        }
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
							<label htmlFor="description">Description</label>
							<input id="description" aria-multiline type="text" name="description" onChange={evt=>this.handleInput(evt)} onKeyPress={this.handleEnter}/>
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