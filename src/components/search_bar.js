import React from "react";
import QuestionBlockManager from "./question_block_manager";
export default class SearchBar extends React.Component{
    //holds the search bar and handles user searching for a question
    state = {
        criteria : "", //holds value to be searched
        question_list : [] //holds edited version of list
    }

    updateList = ()=>{
        //edit this.props.list here
        console.log("edit list here according to search criteria");
        var list = [];
        let input_array = this.props.list;
        let title = input_array[0].toUpperCase(); // does not change the value of input_array()
        if(input_array[0].title.includes(this.state.criteria)){
            // entry contains the substring criteria
        }
    }
    handleInput = (event) =>{ //updates search criteria
		const target = event.target;
		const name = target.name;
		const value = target.value;
		this.setState({
			[name] : value,
		})
	}

    render(){
        if(criteria != "" | criteria != null | criteria != " "){
            console.log("display search results");
        }
        if((this.state.question_list == []) | (this.state.question_list == "") | (this.state.question_list == null)){
            //saved copy of list of questions was empty
            this.setState({question_list : this.props.list});
        }
        return(
            <div>
                <div className="coloumn">
                
                <input type="text" name = "criteria" id = "criteria" onChange={evt=>this.handleInput(evt)}/>
                <QuestionBlockManager list = {this.props.list}/>
                </div>
            </div>
        )
    }
}