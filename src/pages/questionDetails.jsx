import React from "react";
import { Link } from "react-router-dom";
import { getQuestionInfo } from "../utils/database_functions";
export default class QuestionDetails extends React.Component{
    state = {response_data : ""}

    //    this.setState({question_id : "asd"});
    
	handleInput = (event) =>{ //captures data user enters for a response
		const target = event.target;
		const name = target.name;
		const value = target.value;
		this.setState({
			[name] : value,
		})
	}

    componentDidMount(){ // executes on page load
    // get more info about question from database
    const question_id = "tCjreYG3SayYCHwbcPLK"
    let succ = getQuestionInfo(question_id);
    Promise.resolve(succ).then((ret=>{
        if(ret[0] == 'success'){
            //show received details
            this.displayDetails(ret[1]);
        }else{
            console.log("Couldn't get info from database");
        }
    }))
    
    }


    displayDetails=(details)=>{
        //received date,desc,title,likes,liked,isQuestioner
        //comment block - from response list - response_id,date,description,likes,mark,user,isLiked
        //getResponses(question_id,sorting_attribute,sorting_direction,startingValue,limit_num)
        //giveResponse_or_Comment(0,id,desc) for adding a response
    }
    displayResponses=()=>{ //will display responses received from database
        //fetch responses from the database
        //set statevalue of list to recieved responses
        //create responseblocks for each response
    }
    handleResponse=()=>{   //handle user giving a response

    }

 
    //
    render(){
      //  const {state} = this.props.location;
       return(     <div>
                <label>Some title</label>
                <Link to="/homepage">      
            <button className='buttonstyle'
                style={{marginTop:10, marginBottom:30}}>
                Back
            </button>
            </Link>
            </div>
       );
    }
}