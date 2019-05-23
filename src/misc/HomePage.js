import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class HomePage extends Component {
  componentDidMount() {
    this.props.ensureLoggedIn();
  }
  render() {
    const contentStyles = {
      padding: "30px 100px",
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      borderRadius: "20px"
    }
    const headerStyles = {
      fontFamily: "Kaushan Script, cursive",
      fontSize: "6rem",
      color: "#eff0f1",
      letterSpacing: "5px"
    }
    return (
      <div className="landing d-flex justify-content-center align-items-center">
        <div className="text-center mx-auto" style={contentStyles}>
          <h1 className="mb-5 mx-auto" style={headerStyles}>Jobly<i className="fas fa-briefcase ml-4"></i></h1>
          {!localStorage.getItem('token') ? (<Link to={`/login`}>
            <button className="btn btn-primary btn-lg mx-auto">Login</button>
          </Link>) : null }
        </div>
      </div>
    )
  }
}
