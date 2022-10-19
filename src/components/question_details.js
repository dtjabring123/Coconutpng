import React from "react";

export default class QuestionDetails extends React.Component{

    //displays a question's details in QuestionInfo.js page

    componentDidUpdate(prevProps,prevState){

    }


    render(){
        return(
            <div>

                <label htmlFor="title" id = "title">Title</label>
            <div className="report">
                <ThemeProvider tokens={tokens} components={components}>
                    <Switch id= "liked_btn" onChange={()=>handleLike()} />
                </ThemeProvider>
            </div>
            
            <div className="report"><input type={"button"} value = "Report" class="rep1" onClick={()=>handleReport()}/></div>
            

            <div className="q-group">
                <label htmlFor="description">Description</label>
                <textarea className="textab" id = "description" readOnly/>
            </div>
            <div className="q-group">
                <label htmlFor="description">Code</label>
                <textarea  id = "code" readOnly/> 
            </div>
              <div className="q-group">
              <div className= "image_div">
                <img id = "image" name = "image" src = ""  />
                </div>
            </div>
            </div>
            
        )
    }
}