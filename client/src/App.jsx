import "./css/style.css";
import React, { Component } from "react";
import { connect } from "react-redux"; // Import connect from react-redux
import NavBar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import AppRouter from "./AppRouter";
import Layout from "./components/Layout";
import EventCard from "./components/EventCard";
import EventList from "./components/EventList";
import axios from "axios";
import { API_URL } from "./config";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";

const LOCALHOST = `${API_URL}`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventData: [],
    };
  }

  render() {
    const { isAuthenticated } = this.props; // Use props to access isAuthenticated
    const { eventData } = this.state;
    return (
      <main className="context">
        {isAuthenticated ? (
          <>
            {/* <SearchBar /> */}
            {/* <div className="app container mt-3 mb-3"> */}
            <Dashboard />
            {/* </div> */}
          </>
        ) : (
          <LoginPage />
        )}
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(App); // Connect the component to the Redux store
