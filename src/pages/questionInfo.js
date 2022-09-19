import React, { useState } from "react";
import { Link,useLocation } from "react-router-dom";
import { tokens, components } from 'react-ui/themes/base';
import { ThemeProvider, Switch } from 'react-ui'
import { getQuestionInfo,getResponses,giveResponse_or_Comment } from "../utils/database_functions";
import ResponseBlock from "../components/response_block";

export default function QuestionInfo(){
    const location  = useLocation();
    const [response_data,setResponse_data] = useState(""); //stores user input for a response
    const [changeQuestionDetails,setChangeQuestionDetails] = useState(false); //used to indicate if database should be queried for question details
    const [response_list,setResponse_list] = useState([]); //stores list of responses to be displayed
    const [changeResponseList,setChangeResponseList] = useState(false);//used to indicate if database should be queried for response list 


    initialiseValues(location.state.name); //start loading details about the question
    displayResponses(location.state.name);
    //get data from db about particular question
    function initialiseValues(question_id){
        console.log(changeQuestionDetails)
        if(changeQuestionDetails == false){ // don't fetch information from database about the question everytime page is rendered
        let succ = getQuestionInfo(question_id);
        Promise.resolve(succ).then((ret=>{
                //show received details
                setChangeQuestionDetails(true);
                displayDetails(ret[1]);
        }))   
    }
    }
    //set values to match data
    function displayDetails(details){
        var title_lbl = document.getElementById("title");
        title_lbl.textContent = details.title;
        var description_lbl = document.getElementById("description");
        description_lbl.value = details.desc;
        //received date,desc,title,likes,liked,isQuestioner
        // from response list - response_id,date,description,likes,mark,user,isLiked
    }

    function  displayResponses(question_id){ //will display responses received from database
        //fetch responses from the database
        console.log(response_list);
        if(changeResponseList == false){
        let succ = getResponses(question_id);
        Promise.resolve(succ).then((ret=>{
                 //save response array
                setResponse_list(ret[1]);
                //change flag for fetching response list 
                setChangeResponseList(true);
        }))   
    }
       
        //create responseblocks for each response
    }
    
    //handle userinput
    const handleChange = e => { //updates response_data to match user input
        setResponse_data(e.target.value)
      }
      //handle adding user adding a response
      function handleResponseAdd(){
        //check response is not empty
        console.log(response_data);
        if((response_data != null) && (response_data.length > 0)){
            //call db method to add response
            let succ = giveResponse_or_Comment(0,location.state.name,response_data);
            Promise.resolve(succ).then((ret)=>{
                    output("Comment added successfully");
                    setChangeResponseList(false);
                    var text_lbl = document.getElementById("input_field");
                    text_lbl.value = "";
            })

        }else{
           output("Your comment cannot be empty");
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

    components.Switch = {
        colors: {
          backgroundOn: '#00f',
          backgroundOff: '#000'
        }
      }

    return(
        <form>
        <div id = "snackbar"></div>
        <div className="q-inner">
            <div>
            <label htmlFor="title" id = "title">Title</label>
            <ThemeProvider tokens={tokens} components={components}>
                    <Switch />
                </ThemeProvider>
            </div>

            <div className="q-group">
                <label htmlFor="description">Description</label>
                <textarea className="textab" id = "description" readOnly/>
            </div>

            <div className="q-group">
                <label htmlFor="description">Post Answer</label>
                <textarea id="input_field" className="texta" placeholder="Type your answer here" onChange={evt=>handleChange(evt)} />
                <input id = "answer" type = "button" value = "Submit" onClick={()=>handleResponseAdd()}/>
                <Link to="/homepage">      
                    <button type="submit" value="Submit" id = "home_button"/>
               </Link>
            </div>
            <div className="container2">
            {
                response_list.map((response)=>{
                        return(<ResponseBlock props = {response} key = {response.id}/>)   
                })
            } 
            </div>

            <Link to="/homepage">      
                <input type="submit" value="BACK"/>
               </Link>
            </div>

    </form>
    )
}