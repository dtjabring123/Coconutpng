import React from "react";
import ResponseBlock from "./response_block";
export default class ResponseBlocks extends React.Component{
    //handles displaying the list of responses
    
    render(){
        let array = this.props.props;
        const questioner = this.props.data;
        try {
            if(array.length != 0){ // list of responses is not empty
                return (
                    <div>
                    {
                        this.props.props.map((response)=>{
                            return(<ResponseBlock props = {response} data = {questioner} key = {response.id}/>)   
                           })
                    }
                   </div>
               )
            }else{ // no responses to display
                return(
                    <div>
                        <label>
                            No Responses Given Yet
                        </label>
                    </div>
                )
            }     
        } catch (error) {
            return(
            <div>
                <label>
                 No Responses Given Yet
                </label>
            </div>)
        }



    }
}