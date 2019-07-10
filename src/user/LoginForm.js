import React, { Component } from 'react';
import PropTypes from 'prop-types';
import JoblyApi from '../helpers/joblyApi';
import Alert from '../misc/Alert';
import "./LoginForm.css";
import UserContext from './UserContext';

/**
 * form allowing a user to login
 */
class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isError: false,
      error: null
    }
  }

  handleChange = (e) => {
    this.context();
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let { username, password } = this.state;
      let { user, token } = await JoblyApi.request('login', { username, password }, "post");
      if (token) {
        const { username } = user;
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        this.props.history.push('/jobs');
      } else {
        throw new Error("Invalid Credentials");
      }
    } catch (e) {
      console.error(e);
      this.setState({ isError: true, error: e });
    }
  }

  render() {
    return (
      <div>
        {this.state.isError ? <Alert error={this.state.error} /> : null}
        <h1 className="m-4 text-center">Login</h1>
        <form onSubmit={this.handleSubmit} className="login-form mx-auto">
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
            <button className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

LoginForm.contextType = UserContext;

LoginForm.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object
}

export default LoginForm;
