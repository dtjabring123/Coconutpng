import React from "react";
import ResponseBlock from "./response_block";
export default class ResponseBlocks extends React.Component{
    //handles displaying the list of responses
    render(){
        console.log(this.props.props);
        let array = this.props.props;
        if(array.length != 0){
            return (
                <div>
                {
                    this.props.props.map((response)=>{
                        return(<ResponseBlock props = {response} key = {response.id}/>)   
                       })
                }
               </div>
           )
        }


    }
}