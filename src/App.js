import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './misc/NavBar';
import Routes from './Routes';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <NavBar />
        <Routes />
      </BrowserRouter>
    );
  }
}
