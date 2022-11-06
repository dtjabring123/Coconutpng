import React from "react";
import { Link } from "react-router-dom";
import { logOut, getAllQuestions } from "../utils/database_functions";
import "../stylesheets/default.css";
// import Question_Block from '../components/question_block.js';
import { user, setUser } from "../utils/userDetails.js";
import SearchBar from "../components/search_bar";

export default class HomePage extends React.Component {
  state = {
    questions: [],
    prev_user: "",
  };
  handleLogout = () => {
    // method handles user trying to log out
    setUser(null);
    var succ = logOut(); //call database method to log out
    Promise.resolve(succ).then((ret) => {
      if (ret === "success") {
        this.output("Logged out");
      } else {
        this.output("Logout failed");
      }
    });
  };

  componentDidMount() {
    //executes on page load to display posts
    this.getList();
  }

  getList = () => {
    // get posts from database to display
    var userdetails = {
      role: 0,
    };
    if (user != null) {
      userdetails = user;
    }
    var succ = getAllQuestions(userdetails);
    Promise.resolve(succ).then((ret) => {
      if (ret[0] === "success") {
        this.processPosts(ret[1]);
      } else {
        this.output("Unable to get posts from database");
      }
    });
  };

  processPosts = (data) => {
    //updates list of questions to display
    this.setState({ questions: data });
  };

  output = (message) => {
    // method displays given message as a toast message
    var x = document.getElementById("snackbar");
    x.className = "show";
    x.innerHTML = message;
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 5000);
  };
  componentDidUpdate(prevProps, prevState) {
    //executes when the saved user is updated
    if (prevState.prev_user !== this.state.prev_user) {
      // saved user has changed
      if (!(this.state.prev_user.role > -1)) {
        // if saved user is a banned user update list of questions
        this.setState({ questions: "you are banned" });
      }
    }
  }

  render() {
    try {
      if (this.state.prev_user.emailAddress !== user.emailAddress) {
        //if the user was not set yet, update to user that database_functions is using
        this.setState({ prev_user: user });
      }
      if (user.role === 1) {
        //user is an admin so display view reports button
        return (
          <div className="area">
            <ul className="circles">
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
            <div className="bg-[#15161D] overflow-x-hidden">
              <h1 className=" flex p-6 text-center md:text-center sm:text-center text-[#ebebebd8] bg-[#2A2B40] drop-shadow-md text-6xl h-28 a justify-center font-bold">
                Questions
              </h1>
              <div id="snackbar"></div>
              <div className="flex my-9  justify-evenly sm:flex-col sm:justify-evenly sm:items-center sm:mx-auto sm:h-60">
                <Link to="/">
                  <button
                    className="p-3 text-[#f5f5f5e5] cursor-pointer bg-[#35365F] hover:bg-[#696cffda] rounded-lg font-larg sm:px-10"
                    onClick={this.handleLogout}
                  >
                    Logout
                  </button>
                </Link>
                <Link to="/profiles">
                  <button className="p-3 text-[#f5f5f5e5] cursor-pointer bg-[#35365F] hover:bg-[#696cffda] rounded-lg font-larg">
                    Change Profile
                  </button>
                </Link>
                <Link to="/createQuestion">
                  <button className="p-3 text-[#f5f5f5e5] cursor-pointer bg-[#35365F] hover:bg-[#696cffda] rounded-lg font-larg">
                    Ask a Question
                  </button>
                </Link>
                <Link to="/reportsPage">
                  <button className="p-3 text-[#f5f5f5e5] cursor-pointer bg-[#35365F] hover:bg-[#696cffda] rounded-lg font-larg sm:px-5">
                    View Reports
                  </button>
                </Link>
              </div>
              <div className="">
                {/*displaying questions here*/}
                <SearchBar
                  list={this.state.questions}
                  className="flex justify-center"
                />
              </div>
            </div>
          </div>
        );
      } else {
        if (user.role < 0) {
          return (
            <div className="area">
              <ul className="circles">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
              <div className="bg-[#15161D] overflow-x-hidden">
                <h1 className=" flex p-6 text-center md:text-center sm:text-center text-[#ebebebd8] bg-[#2A2B40] drop-shadow-md text-6xl h-28 a justify-center font-bold">
                  Questions
                </h1>
                <div id="snackbar"></div>
                <div className="flex my-9  justify-evenly sm:flex-col sm:justify-evenly sm:items-center sm:mx-auto sm:h-60">
                  <Link to="/">
                    <button
                      className="p-3 text-[#f5f5f5e5] cursor-pointer bg-[#35365F] hover:bg-[#696cffda] rounded-lg font-larg"
                      onClick={this.handleLogout}
                    >
                      Logout
                    </button>
                  </Link>
                  <Link to="/profiles">
                    <button className="p-3 text-[#f5f5f5e5] cursor-pointer bg-[#35365F] hover:bg-[#696cffda] rounded-lg font-larg">
                      Change Profile
                    </button>
                  </Link>
                </div>
                <div className="">
                  {/*displaying questions here*/}
                  <SearchBar
                    list={this.state.questions}
                    className="flex justify-center"
                  />
                </div>
              </div>
            </div>
          );
        } else {
          return (
            <div className="area">
              <ul className="circles">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
              <div className="bg-[#15161D] overflow-x-hidden">
                <h1 className=" flex p-6 text-center md:text-center sm:text-center text-[#ebebebd8] bg-[#2A2B40] drop-shadow-md text-6xl h-28 a justify-center font-bold">
                  Questions
                </h1>
                <div id="snackbar"></div>
                <div className="flex my-9  justify-evenly sm:flex-col sm:justify-evenly sm:items-center sm:mx-auto sm:h-60">
                  <Link to="/">
                    <button
                      className="p-3 text-[#f5f5f5e5] cursor-pointer bg-[#35365F] hover:bg-[#696cffda] rounded-lg font-larg"
                      onClick={this.handleLogout}
                    >
                      Logout
                    </button>
                  </Link>
                  <Link to="/profiles">
                    <button className="p-3 text-[#f5f5f5e5] cursor-pointer bg-[#35365F] hover:bg-[#696cffda] rounded-lg font-larg">
                      Change Profile
                    </button>
                  </Link>
                  <Link to="/createQuestion">
                    <button className="p-3 text-[#f5f5f5e5] cursor-pointer bg-[#35365F] hover:bg-[#696cffda] rounded-lg font-larg">
                      Ask a Question
                    </button>
                  </Link>
                </div>
                <div className="">
                  {/*displaying questions here*/}
                  <SearchBar
                    list={this.state.questions}
                    className="flex justify-center"
                  />
                </div>
              </div>
            </div>
          );
        }
      }
    } catch (error) {
      return (
        <div className="area">
          <ul className="circles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
          <div className="bg-[#15161D] overflow-x-hidden">
            <h1 className=" flex p-6 text-center md:text-center sm:text-center text-[#ebebebd8] bg-[#2A2B40] drop-shadow-md text-6xl h-28 a justify-center font-bold">
              Questions
            </h1>
            <div id="snackbar"></div>
            <div className="flex my-9  justify-evenly sm:flex-col sm:justify-evenly sm:items-center sm:mx-auto sm:h-60">
              <Link to="/">
                <button
                  className="p-3 text-[#f5f5f5e5] cursor-pointer bg-[#35365F] hover:bg-[#696cffda] rounded-lg font-larg sm:p-4"
                  onClick={this.handleLogout}
                >
                  Logout
                </button>
              </Link>
              <Link to="/profiles">
                <button className="p-3 text-[#f5f5f5e5] cursor-pointer bg-[#35365F] hover:bg-[#696cffda] rounded-lg font-larg">
                  Change Profile
                </button>
              </Link>
              <Link to="/createQuestion">
                <button className="p-3 text-[#f5f5f5e5] cursor-pointer bg-[#35365F] hover:bg-[#696cffda] rounded-lg font-larg">
                  Ask a Question
                </button>
              </Link>
              <Link to="/reportsPage">
                <button className="p-3 text-[#f5f5f5e5] cursor-pointer bg-[#35365F] hover:bg-[#696cffda] rounded-lg font-larg">
                  View Reports
                </button>
              </Link>
            </div>
            <div className="">
              {/*displaying questions here*/}
              <SearchBar
                list={this.state.questions}
                className="flex justify-center"
              />
            </div>
          </div>
        </div>
      );
    }
  }
}
