import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './misc/NavBar';
import Routes from './Routes';
import './App.css';

/**
 * 
 */
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    }
  }

  /** */
  componentDidMount() {
    this.setState({ loggedIn: localStorage.getItem('token') ? true : false });
  }

  /** */
  ensureLoggedIn = () => {
    let loggedIn = localStorage.getItem('token') ? true : false;
    this.setState({ loggedIn });
  }

  render() {
    return (
      <BrowserRouter>
        <NavBar loggedIn={this.state.loggedIn} />
        <Routes ensureLoggedIn={this.ensureLoggedIn} />
      </BrowserRouter>
    );
  }
}
