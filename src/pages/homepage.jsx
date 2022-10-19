import React from 'react'
import { Link } from "react-router-dom"
import { logOut,getAllQuestions } from '../utils/database_functions';
import "../stylesheets/default.css";
import Question_Block from '../components/question_block.js';
import {user,setUser} from '../utils/userDetails.js';
import SearchBar from '../components/search_bar';

export default class HomePage extends React.Component {
    state = {
        questions : [],
        prev_user : ""
    }
    handleLogout = () =>{  // method handles user trying to log out
        setUser(null);
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
        this.getList();
    }

    getList = ()=>{
        // get posts from database to display
        var userdetails = {
            role : 0
        }
        if(user != null){
            userdetails = user;
        }
        var succ = getAllQuestions(userdetails);
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
    componentDidUpdate(prevProps,prevState){ //executes when the saved user is updated
        if(prevState.prev_user != this.state.prev_user){ // saved user has changed
            if(!(this.state.prev_user.role > -1)){ // if saved user is a banned user update list of questions 
                this.setState({questions : "you are banned"})
            }
        }
    }

render(){
    try {
        if(this.state.prev_user.emailAddress != user.emailAddress){ //if the user was not set yet, update to user that database_functions is using
            this.setState({prev_user : user});
        }
        if(user.role == 1){ //user is an admin so display view reports button
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
                                <Link to="/reportsPage">
                                    <button className='buttonstyle' id="reports_btn"
                                        style={{marginTop:10,marginBottom:30}}>
                                            View Reports
                                        </button>
                                </Link>
                            
                            </div>
                            <div className='container1'>
                                {/*displaying questions here*/}
                                <SearchBar list = {this.state.questions}/>
                            </div>
                        </div>
                </div>);
        }else{
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
                                {/*displaying questions here*/}
                                <SearchBar list = {this.state.questions}/>
                        </div>
                </div>);
        }
    } catch (error) {
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
                            {/*displaying questions here*/}
                            <SearchBar list = {this.state.questions}/>
                    </div>
            </div>);
        }
	}
}
