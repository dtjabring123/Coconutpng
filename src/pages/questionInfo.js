import React, { useState } from "react";
import { Link,useLocation } from "react-router-dom";
import { getQuestionInfo,getResponses,giveResponse_or_Comment } from "../utils/database_functions";
export default function QuestionInfo(){
    const location  = useLocation();
    const [response_data,setResponse_data] = useState("");
    initialiseValues(location.state.name); //start loading details about the question

    //get data from db about particular question
    function initialiseValues(question_id){
        let succ = getQuestionInfo(question_id);
        Promise.resolve(succ).then((ret=>{
            if(ret[0] == 'success'){
                //show received details
                console.log("got question details");
                console.log(ret[1]);
                displayDetails(ret[1]);
            }else{
                console.log("Couldn't get info from database");
            }
        }))   
    }
    //set values to match data
    function displayDetails(details){
        var title_lbl = document.getElementById("title");
        title_lbl.textContent = details.title;
        var description_lbl = document.getElementById("description");
        description_lbl.value = details.desc;
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
        <form>
        <div id = "snackbar"></div>
        <div className="q-inner">
            <label htmlFor="title" id = "title">Title</label>

            <div className="q-group">
                <label htmlFor="description">Description</label>
                <textarea className="textab" id = "description" readOnly/>
            </div>

            <div className="q-group">
                <label htmlFor="description">Post Answer</label>
                <textarea className="texta" placeholder="Type your answer here" onChange={evt=>handleChange(evt)} />
                <input id = "answer" type = "button" value = "Submit" onClick={handleResponseAdd()}/>
                <Link to="/homepage">      
                    <button type="submit" value="Submit" id = "home_button"/>
               </Link>
            </div>

            <Link to="/homepage">      
                <input type="submit" value="BACK"/>
               </Link>
            </div>
    </form>
    )
}