import React, { Component } from 'react';
import PropTypes from 'prop-types';
import JoblyApi from '../helpers/joblyApi';
import Alert from '../misc/Alert';
import "./RegisterForm.css";

/**
 * 
 */
export default class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      first_name: "",
      last_name: "",
      email: "",
      photo_url: "",
      isError: false,
      error: {}
    }
  }

  /** */
  componentDidMount() {
    this.props.ensureLoggedIn();
  }

  /** */
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  /** */
  handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password, first_name, last_name, email, photo_url } = this.state;
    const userObj = { username, password, first_name, last_name, email, photo_url };
    for (let key in userObj) {
      if (userObj[key] === "") {
        delete userObj[key];
      }
    }
    try {
      let { token, newUser } = await JoblyApi.request('users', userObj, "post");
      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("username", newUser.username);
        this.props.history.push('/jobs');
      } else {
        throw new Error("Invalid Input");
      }
    } catch (e) {
      this.setState({ isError: true, error: e })
    }
  }

  render() {
    return (
      <div>
        <h1 className="m-4 text-center">Register</h1>
        {this.state.isError ? <Alert error={this.state.error} /> : null}
        <form onSubmit={this.handleSubmit} className="register-form mb-5 mx-auto">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              className="form-control"
              id="username"
              type="text"
              onChange={this.handleChange}
              name="username"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              className="form-control"
              id="password"
              type="password"
              onChange={this.handleChange}
              name="password"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="first_name">First Name</label>
            <input
              className="form-control"
              id="first_name"
              type="text"
              onChange={this.handleChange}
              name="first_name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="last_name">Last Name</label>
            <input
              className="form-control"
              id="last_name"
              type="text"
              onChange={this.handleChange}
              name="last_name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              className="form-control"
              id="email"
              type="text"
              onChange={this.handleChange}
              name="email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="photo_url">Photo URL</label>
            <input
              className="form-control"
              id="photo_url"
              type="text"
              onChange={this.handleChange}
              name="photo_url"
            />
          </div>
          <div className="form-group">
            <button className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

RegisterForm.propTypes = {
  ensureLoggedIn: PropTypes.func,
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object
}
