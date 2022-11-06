import React from "react";
import { Link } from "react-router-dom";
import {
  createReport,
  likeQuestion,
  giveResponse_or_Comment,
  getResponses,
} from "../utils/database_functions";
import { tokens, components } from "react-ui/themes/base";
import { ThemeProvider, Switch } from "react-ui";
import ResponseBlocks from "../components/response_blocks";
import CodeSegment from "./code_segment";
export default class QuestionDetails extends React.Component {
  //displays a question's details in QuestionInfo.js page
  //handles updating the list of responses when a user has added a response
  state = {
    details: "",
    question_id: "",
    answer: "",
    code: "",
    liked: false,
    response_list: [],
  };
  componentDidMount() {
    this.setState({ details: this.props.list });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.list != this.props.list) {
      //update question details
      this.setState({
        details: this.props.list,
        question_id: this.props.q_id,
        liked: this.props.list.liked,
      });
    }
    if (prevState.question_id != this.state.question_id) {
      this.displayResponses(); // update responses displayed
    }
  }
  handleLike = () => {
    //handles user liking question
    //get like status
    var liked_lbl = document.getElementById("liked_btn");
    var option = liked_lbl.checked;
    //convert true/false like value to int value
    var vote;
    if (option == false) {
      vote = 0;
    } else {
      vote = 1;
    }
    //use database method
    let succ = likeQuestion(vote, this.state.question_id);
    Promise.resolve(succ).then((ret) => {
      if (ret[0] == "success") {
        //call method again to change like value
        this.setState({ liked: option });
      }
    });
  };

  handleReport = () => {
    //handles reporting the question
    console.log("reporting question");
    console.log(this.state);
    let succ = createReport(this.state.question_id, null);
    Promise.resolve(succ).then((ret) => {
      if (ret == "success") {
        this.output("Question reported");
      } else {
        this.output("Could not report question");
      }
    });
  };
  output = (message) => {
    //output is given a message and displays a toast message of the input
    var x = document.getElementById("snackbar");
    x.className = "show";
    x.innerHTML = message;
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 3000);
  };

  handleInput = (event) => {
    //updates user's response
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value,
    });
  };
  handleResponseAdd = () => {
    //handle user adding a response
    //check response given is not empty
    if (this.state.answer != null && this.state.answer.length > 0) {
      //call db method to add response
      let succ = giveResponse_or_Comment(
        0,
        this.state.question_id,
        this.state.answer,
        this.state.code
      );
      Promise.resolve(succ).then((ret) => {
        if ((ret[0] == "success") | (ret == "success")) {
          this.output("Response added successfully");
          var text_lbl = document.getElementById("answer");
          text_lbl.value = "";
          var code_lbl = document.getElementById("code_block");
          code_lbl.value = "";
          this.displayResponses();
        } else {
          this.output("Failed to add response");
        }
      });
    } else {
      this.output("Your comment cannot be empty");
    }
  };

  displayResponses = () => {
    //fetches the list of responses from the database
    let succ = getResponses(
      this.state.question_id,
      "response_date",
      "desc",
      null,
      50
    );
    Promise.resolve(succ).then((ret) => {
      //save response array
      if (ret[0] == "success") {
        this.setState({ response_list: ret[1] });
      }
    });
  };

  render() {
    if (this.state.details == "") {
      return (
        <div>
          <label className="text-white">Loading Question</label>
        </div>
      );
    } else {
      components.Switch = {
        colors: {
          backgroundOn: "#00f",
          backgroundOff: "#000",
        },
      };
      //make liked button match user's liked status
      var flag = false;
      if (this.state.liked == 1) {
        flag = true;
      }
      return (
        <div className=" w-auto overflow-x-hidden lg:justify-center	 ml-8   sm:mx-auto md:justify-center sm:justify-center ">
          <div className="header-x">
          <div>

          <label htmlFor="title" id="title" className="qtitle">
            {this.state.details.title}
          </label>
          <div className="report">
            <ThemeProvider tokens={tokens} components={components}>
              <Switch
                id="liked_btn"
                onChange={() => this.handleLike()}
                checked={flag}
              />
            </ThemeProvider>
          </div>
          </div>

          <div className="report">
            <input
              type={"button"}
              value="Report"
              class="rep1"
              onClick={() => this.handleReport()}
            />
          </div>
            {/* here */}
          </div>

          <div className="q-group">
            <label htmlFor="description" className="text-white">
              Description
            </label>
            
            <textarea
              className="texta"
              id="description"
              value={this.state.details.desc}
              readOnly
            />
          </div>
          <CodeSegment code={this.state.details.code} id = "code_segment" />
          <div className="q-group">
            <div className="image_div">
              <img id="image" name="image" src={this.state.details.images[0]} />
            </div>
          </div>
          <div className="flex flex-col xl:items-center lg:items-center  sm:items-center xs:items-center ">
            <label htmlFor="description" className="text-white">
              Post Answer
            </label>
            
              <textarea
                id="answer"
                name="answer"
                className="texta"
                placeholder="Type your answer here"
                onChange={(evt) => this.handleInput(evt)}
              />
              <div className="flex flex-col ">
                <label htmlFor="code" className="text-white">
                  Add some code
                </label>
                <textarea
                  id="code_block"
                  name="code"
                  className="texta"
                  placeholder="Add your code here"
                  onChange={(evt) => this.handleInput(evt)}
                />
              </div>{" "}
           
            <input
              id="answer_btn"
              type="button"
              value="Submit"
              className="submit-q"
              onClick={() => this.handleResponseAdd()}
            />
          </div>

          <div className="container2">
            {/*render responses here */}
            <ResponseBlocks
              props={this.state.response_list}
              data={this.state.details.isQuestioner}
              id="response_container"
            />
          </div>

          <Link to="/homepage">
            <button type="submit" value="Submit" id="home_button" />
          </Link>
        </div>
      );
    }
  }
}