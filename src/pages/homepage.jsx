import React from 'react'
import { Link,useNa } from "react-router-dom"
import { logOut,getAllQuestions } from '../utils/database_functions';
import "../stylesheets/default.css";
import Question_Block from '../components/question_block';

export default class HomePage extends React.Component {
    state = {
        questions : []
    }
    handleLogout = () =>{  // method handles user trying to log out
        var succ = logOut(); //call database method to log out
        Promise.resolve(succ).then((ret) =>{
            if(ret === "success"){
                this.output("Logged out");
            }else{
                this.output("Logout failed");
            }
        });
    }

    componentDidMount(){ //executes on page load to display posts
        // get posts from database to display
        var succ = getAllQuestions();
        Promise.resolve(succ).then((ret)=>{
            if(ret[0] == 'success'){
                this.processPosts(ret[1]);
            }else{
                this.output("Unable to get posts from database");
            }
        });
    }
    processPosts = (data) =>{//updates list of questions to display
        this.setState({questions:data});
    }

	output = (message) =>{ // method displays given message as a toast message
		var x = document.getElementById("snackbar");
		x.className = "show";
		x.innerHTML = message;
		setTimeout(function () {
			x.className = x.className.replace("show", "");
		}, 5000);
	}

render(){
    return (
    <div class="area" >
        <ul class="circles">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
        </ul>
            <div className='homestyle'>
                <h1 className='questions'>Questions</h1>
                <div class="row_questions">
                    <div id = "snackbar"></div>
                    <Link to="/">      
                        <button className='buttonstyle' onClick={this.handleLogout}
                            style={{marginTop:10, marginBottom:30}}>
                            Logout
                        </button>
                    </Link>
                    <Link to="/profiles">      
                        <button className='buttonstyle'
                            style={{marginTop:10, marginBottom:30}}>
                            Change Profile
                        </button>
                    </Link>
                    <Link to="/createQuestion">
                        <button className='buttonstyle'
                            style={{marginTop:10,marginBottom:30}}>
                                Ask a Question
                            </button>
                    </Link>
                
                </div>
                <div className='container1'>
                    {/*displaying questions here*/}
                    {
                    this.state.questions.map((question) =>{
                            if((question.title != null) && (question.title != "")){
                                return(<Question_Block props = {question} key = {question.question_id} />)
                            }
                            console.log(this);
                        })  
                    } 
                </div>
            </div>
    </div>);
	}
}
