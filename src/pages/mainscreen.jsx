import React from 'react'
import { Link } from "react-router-dom"
import "../stylesheets/default.css";

export default class WelcomePage extends React.Component {
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
      <div class="row">
<div className="row">
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
    </div>
    </div>);
	}
  
}

