import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class HomePage extends Component {
  componentDidMount() {
    this.props.ensureLoggedIn();
  }
  render() {
    const contentStyles = {
      padding: "20px 40px",
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      borderRadius: "50px"
    }
    return (
      <div className="landing d-flex justify-content-center align-items-center">
        <div className="text-center mx-auto" style={contentStyles}>
          <img src="https://res.cloudinary.com/dxklaorw6/image/upload/v1558640373/jobly.png" alt="jobly-logo" style={{display: "block", width: "300px"}} />
          <p style={{color: "#fff", fontSize: "1.2rem"}}>All the jobs in one, convenient place.</p>
          {!localStorage.getItem('token') ? (<Link to={`/login`}>
            <button className="btn btn-primary btn-lg mt-1 mb-3 mx-auto">Login</button>
          </Link>) : null }
        </div>
      </div>
    )
  }
}
