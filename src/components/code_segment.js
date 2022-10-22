import React from "react";

export default class CodeSegment extends React.Component{
    render(){
        if(this.props.code == ""){
            return(<div>

            </div>)
        }
        return(
            <div>
                    <div className="q-group">
                        <label htmlFor="description">Code</label>
                        <textarea  id = "code"  value = {this.props.code} readOnly/> 
                    </div>
            </div>
        )
    }
}