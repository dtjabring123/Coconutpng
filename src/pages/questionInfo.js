import React, { useState } from "react";
import { Link,useLocation } from "react-router-dom";
import { tokens, components } from 'react-ui/themes/base';
import { ThemeProvider, Switch } from 'react-ui'
import { useEffect } from "react";
import { getQuestionInfo,getResponses,giveResponse_or_Comment,likeQuestion,createReport } from "../utils/database_functions";
import ResponseBlocks from "../components/response_blocks";
import "../stylesheets/questiondetails.css";
import QuestionDetails from "../components/question_details";
export default function QuestionInfo(){
    const location  = useLocation();
    const [changeQuestionDetails,setChangeQuestionDetails] = useState(false); //used to indicate if database should be queried for question details
    const [response_list,setResponse_list] = useState([]); //stores list of responses to be displayed
    const [changeResponseList,setChangeResponseList] = useState(false);//used to indicate if database should be queried for response list 
    const [questioner,setQuestioner] = useState(false);
    const [questionData,setQuestionData] = useState("") //used to store details about the question

    useEffect(()=>{
        //runs when page is loaded
        initialiseValues(location.state.name); //start loading details about the question
        displayResponses(location.state.name);
    })

    //get data from db about particular question
    function initialiseValues(question_id){
        if(changeQuestionDetails == false){ // don't fetch information from database about the question everytime page is rendered
        let succ = getQuestionInfo(question_id);
        Promise.resolve(succ).then((ret=>{
                //show received details
                if(ret[0] == "success"){
                    setChangeQuestionDetails(true);
                    setQuestionData(ret[1]);
                    setQuestioner(ret[1].isQuestioner);
                }else{
                    output("Auth token Expired");
                    document.getElementById("home_button").click();       
                }
        }))   
      }
    }

    function  displayResponses(question_id){ //will display responses received from database
        //fetch responses from the database
        if(changeResponseList == false){
        let succ = getResponses(question_id,'response_date','desc',null,50);
        Promise.resolve(succ).then((ret=>{  
                 //save response array
                 if(ret[0] == "success"){
                    setResponse_list(ret[1]);
                    //change flag for fetching response list 
                    setChangeResponseList(true);
                 }
            }))   
        }
    }

      function output(message){ //output is given a message and displays a toast message of the input
		var x = document.getElementById("snackbar");
		x.className = "show";
		x.innerHTML = message;
		setTimeout(function () {
			x.className = x.className.replace("show", "");
		}, 3000);
	}


    return(
        <form>
        <div className="q-inner">
        <div id = "snackbar"></div>
        <QuestionDetails list = {questionData} q_id={location.state.name} />
            <div className="container2">
            {/*render responses here */}
            <ResponseBlocks props = {response_list} data = {questioner} id = "response_container" />
            </div>

            <Link to="/homepage">      
                <input type="submit" value="BACK"/>
               </Link>
            </div>
    </form>
    )
}