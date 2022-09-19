import React, { useState } from "react";
import { Link,useLocation } from "react-router-dom";
import { getQuestionInfo,getResponses,giveResponse_or_Comment } from "../utils/database_functions";
export default function QuestionInfo(){
    const location  = useLocation();
    const [response_data,setResponse_data] = useState("");
    //displayDetails(location.state.name); //start loading details about the question

    //get data from db about particular question
    function initialiseValues(question_id){
        let succ = getQuestionInfo(question_id);
        Promise.resolve(succ).then((ret=>{
            if(ret[0] == 'success'){
                //show received details
                displayDetails(ret[1]);
            }else{
                console.log("Couldn't get info from database");
            }
        }))   
    }
    //set values to match data
    function displayDetails(details){
        //received date,desc,title,likes,liked,isQuestioner
        //comment block - from response list - response_id,date,description,likes,mark,user,isLiked
        //getResponses(question_id,sorting_attribute,sorting_direction,startingValue,limit_num)
        //giveResponse_or_Comment(0,id,desc) for adding a responsefvvfvvvbgvgbb
    }

    function  displayResponses(){ //will display responses received from database
        //fetch responses from the database
        //set statevalue of list to recieved responses
        //create responseblocks for each response
    }
    //handle userinput
    const handleChange = e => { //updates response_data to match user input
        setResponse_data(e.target.value)
      }
      //handle adding a response
      function handleResponseAdd(){
        //check response is not empty
        if((response_data != null) && (response_data.length > 0)){
            //call db method to add response
            //output if successful or not
        }
      }

    return(
        <div>
        <div>Stuff here</div>
        <input id="response_data" type="text" name="response_data" onChange={evt=>handleChange(evt)}/>
        
        <Link to="/homepage">      
        <button className='buttonstyle'
            style={{marginTop:10, marginBottom:30}}>
            Back
        </button>
        </Link>

        </div>

    )
}