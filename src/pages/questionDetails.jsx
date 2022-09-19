import React from "react";
import { Link } from "react-router-dom";

export default class QuestionDetails extends React.Component{
    state = {id : "stuff",name : "name"}
    // constructor(props){
    //     super(props);
    //     this.state={
    //         value : this.props.location.state,
    //     }
    // }

    componentDidMount(){ // executes on page load
    // get more info about question from database


    //show received details


    }
    //needs a handle input for user to comment
    //
    render(){
      //  const {state} = this.props.location;
      console.log(this.state);
        return(
            <div>
                <label>Some title</label>
                <Link to="/">      
            <button className='buttonstyle'
                style={{marginTop:10, marginBottom:30}}>
                Back
            </button>
            </Link>
            </div>
            
        )
    }
}