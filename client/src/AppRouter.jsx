import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AboutUs from "./components/AboutUs";
import TermsOfService from "./components/TermsOfService";
import App from "./App";
import Navbar from "./components/Navbar";
import LoginPage from "./components/LoginPage";
import RegPage from "./components/RegPage";
import EventPage from "./components/EventPage";
import axios from "axios";
import CreateEvent from "./components/CreateEvent";
import { API_URL } from "./config";
import { Provider } from "react-redux";
import store from "./store";
import RegisterEvent from "./components/RegisterEvent";
import MyEvents from "./components/MyEvents";
import StudentList from "./components/StudentList";
import CompleteReg from "./components/CompleteReg";
import ClassRooms from "./components/ClassRooms";
import Fees from "./components/Fees";
import Results from "./components/Results";
import Books from "./components/Books";

const LOCALHOST = `${API_URL}`;

class AppRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventData: [],
    };
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/terms" element={<TermsOfService />}>
              {/* <Route element={<Navbar />}></Route> */}
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<RegPage emailError={this.state.emailError} passwordError={this.state.passwordError} alertBoxClass={this.state.alertBoxClass} errorMessage={this.state.errorMessage} />} />
            <Route path="/create" element={<CreateEvent />} />
            <Route path="/registered" element={<MyEvents />} />
            <Route path="/:eventLink" element={<EventPage events={this.state.eventData} />} />
            <Route path="/:eventLink/register" element={<RegisterEvent events={this.state.eventData} />} />
            <Route path="/admin/students" element={<StudentList />} />
            <Route path="/signup/complete/:name/:sid/:dept" element={<CompleteReg />} />
            <Route path="/classes" element={<ClassRooms />} />
            <Route path="/fees" element={<Fees />} />
            <Route path="/results" element={<Results />} />
            <Route path="/books" element={<Books />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default AppRouter;
