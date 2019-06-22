import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import joblyApi from './helpers/joblyApi.js';
import { decode } from "jsonwebtoken";
import NavBar from './misc/NavBar';
import Routes from './Routes';
import UserContext from './user/UserContext';
import './App.css';

/**
 * *** App.js ***
 * - main application component
 */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: "",
      loggedIn: false
    }
  }

  /** when component mounts, check if user logged in */
  componentDidMount() {
    this.ensureLoggedIn();
  }

  /**
   * grabs token from local storage (if there is one)
   * decodes token
   * grabs user data from db
   * changes state
   * if an error occurs, logs to console and clears all user data from client
   */
  ensureLoggedIn = async () => {
    const token = localStorage.getItem("token");
    try {
      let { username } = decode(token);
      let currentUser = await joblyApi.request(`users/${username}`);
      this.setState({ currentUser, loggedIn: true });
    } catch (e) {
      console.error(e);
      this.setState({ currentUser: null, loggedIn: false });
      localStorage.removeItem('username');
      localStorage.removeItem('token');
    }
  }

  render() {
    return (
      <BrowserRouter>
          <UserContext.Provider value={this.ensureLoggedIn}>
            <NavBar loggedIn={this.state.loggedIn} />
            <Routes />
          </UserContext.Provider>
      </BrowserRouter>
    );
  }
}

export default App;
