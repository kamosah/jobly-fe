import React, { Component } from 'react';
import JoblyApi from '../helpers/joblyApi';
import Alert from '../misc/Alert';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isError: false,
      error: {}
    }
  }

  handleChange = (e) => {
    this.props.ensureLoggedIn();
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
        this.props.history.push('/companies');
      } else {
        throw new Error("Invalid Credentials");
      }
    } catch (e) {
      this.setState({ isError: true, error: e });
    }
  }

  render() {
    return (
      <div>
        <h1 className="m-4 text-center">Login</h1>
        {this.state.isError ? <Alert error={this.state.error} /> : null}
        <form onSubmit={this.handleSubmit} className="mx-auto" style={{ maxWidth: "480px" }}>
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
    )
  }
}
