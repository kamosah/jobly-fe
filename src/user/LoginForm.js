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
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let { username, password } = this.state;
      let { token } = await JoblyApi.request('login', { username, password }, "post");
      if (token) {
        localStorage.setItem("token", token);
        this.props.history.push('/companies');
      } else {
        throw new Error("Invalid username and/or password", 401);
      }
    } catch(err) {
      this.setState({ isError: true, error: err });
    }
  }

  render() {
    return (
      <div>
        <h1 className="m-4 text-center">Login</h1>
        {this.state.isError ? <Alert error={this.state.error} /> : null}
        <form onSubmit={this.handleSubmit}  className="mx-auto" style={{maxWidth: "480px"}}>
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
