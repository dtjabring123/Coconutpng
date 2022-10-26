import React from "react";
import QuestionBlockManager from "./question_block_manager";
import "../stylesheets/default.css";
import "../index.css";
export default class SearchBar extends React.Component {
  //holds the search bar and handles user searching for a question
  state = {
    criteria: "", //holds value to be searched
    question_list: [], //holds edited version of list
  };

  updateList = () => {
    var list = []; //holds list of questions to display
    let input_array = this.props.list; // original list of questions
    var search_val = this.state.criteria.toUpperCase();
    for (let index = 0; index < input_array.length; index++) {
      let question = input_array[index];
      let title = question.title.toUpperCase();
      let description = question.desc.toUpperCase();
      let author = question.author.toUpperCase();

      if (
        title.includes(search_val) |
        description.includes(search_val) |
        author.includes(search_val)
      ) {
        // entry contains the substring criteria
        list.push(question);
      }
    }
    this.setState({ question_list: list });
  };
  handleInput = (event) => {
    //updates search criteria
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps != this.props) {
      //update question list
      this.setState({ question_list: this.props.list });
    }
  }
  handleEnter = (event) => {
    // if enter key is pressed, search list
    if (event.key == "Enter") {
      event.preventDefault();
      this.updateList();
    }
  };
  render() {
    return (
      <div>
        {/* here is the search bar */}
        <div className="flex mx-auto justify-center my-6 md:my-2 ">
          <input
            type="text"
            name="criteria"
            id="criteria"
            className="rounded-sm"
            onChange={(evt) => this.handleInput(evt)}
            onKeyPress={(evt) => this.handleEnter(evt)}
          />
          <button
            onClick={() => this.updateList()}
            className="p-3 text-[#f5f5f5e5] cursor-pointer bg-[#35365F] hover:bg-[#696cffda] rounded-sm font-larg"
          >
            Search
          </button>
        </div>
        <QuestionBlockManager list={this.state.question_list} />
        {/**displays list of questions that match criteria */}
      </div>
    );
  }
}