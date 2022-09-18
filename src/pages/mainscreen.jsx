import React from 'react'
import { Link } from "react-router-dom"
import "../stylesheets/default.css";
import Question_Block from '../components/question_block';
export default class WelcomePage extends React.Component {

  state={data:"Hello World",
title : "How do I solve this?",author: "user08",likes : 8}

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
    <div class="context">
      <h1>Welcome To Coconut Overflow</h1>
      <div className="row">
        <Question_Block props = {this.state} key = {"comp"}/>
            <Link to="/login">      
            <button className='buttonstyle'
                style={{marginTop:10, marginBottom:30}}>
                Login
            </button>
            </Link>
            <Link to="/Register">      
            <button className='buttonstyle'
                style={{marginTop:10, marginBottom:30}}>
                Register
            </button>
            </Link>
            
      </div>
      </div>
    </div>);
	}
  
}

