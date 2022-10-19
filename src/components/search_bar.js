import React from "react";
import QuestionBlockManager from "./question_block_manager";
import "../stylesheets/default.css";
import "../index.css";
export default class SearchBar extends React.Component{
    //holds the search bar and handles user searching for a question
    state = {
        criteria : "", //holds value to be searched
        question_list : [] //holds edited version of list
    }

    updateList = ()=>{
        var list = []; //holds list of questions to display
        let input_array = this.props.list; // original list of questions
        var search_val = this.state.criteria.toUpperCase();
        for (let index = 0; index < input_array.length; index++) {
            let question = input_array[index];
            let title = question.title.toUpperCase();
            let description = question.desc.toUpperCase();
            let author = question.author.toUpperCase();

            if(title.includes(search_val) | (description.includes(search_val)) | (author.includes(search_val))){
            // entry contains the substring criteria
                list.push(question);
            }
        }
        this.setState({question_list : list});
    }
    handleInput = (event) =>{ //updates search criteria
		const target = event.target;
		const name = target.name;
		const value = target.value;
		this.setState({
			[name] : value,
		})
	}

    componentDidUpdate(prevProps,prevState){
        if(prevProps != this.props){
            //update question list
            this.setState({question_list : this.props.list});
        }
    }
    render(){
        return(
            <div>
                <input type="text" name = "criteria" id = "criteria" onChange={evt=>this.handleInput(evt)}/>
                <button onClick={()=>this.updateList()}>
                    Search
                </button>
                 <QuestionBlockManager list = {this.state.question_list}/>{/**displays list of questions that match criteria */}
            </div>
        )
    }
}