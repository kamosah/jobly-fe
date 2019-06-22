import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import joblyApi from './helpers/joblyApi.js';
import { decode } from "jsonwebtoken";
import NavBar from './misc/NavBar';
import Routes from './Routes';
import UserContext from './user/UserContext';
import './App.css';

/**
 * 
 */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: "",
      loggedIn: false
    }
  }

  /** */
  componentDidMount() {
    this.setState({ loggedIn: localStorage.getItem('token') ? true : false });
  }

  /** */
  ensureLoggedIn = async () => {
    const token = localStorage.getItem("token");
    try {
      let { username } = decode(token);
      let currentUser = await joblyApi.request(`users/${username}`, {}, 'get');
      this.setState({ currentUser, loggedIn: true })
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
