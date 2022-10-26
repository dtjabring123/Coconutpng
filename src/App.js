import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/mainscreen";
import HomePage from "./pages/homepage";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import ProfilePage from "./pages/profiles";
import CreateQuestion from "./pages/createQuestion";
import QuestionInfo from "./pages/questionInfo";
import ReportsPage from "./pages/reportsPage";
import ForgotPassword from "./pages/forgotPassword";
class App extends Component {
  render() {
    return (
      <div className="flex bg-[#232331] h-screen sm:h-auto md:h-auto xl:justify-center md:justify-center  lg:w-full sm:w-full sm:justify-center">
        <Router>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/homepage" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profiles" element={<ProfilePage />} />
            <Route path="/createQuestion" element={<CreateQuestion />} />
            <Route path="questionInfo" element={<QuestionInfo />} />
            <Route path="/ReportsPage" element={<ReportsPage />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;