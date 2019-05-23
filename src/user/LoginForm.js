import React, { Component } from 'react';
import JoblyApi from '../helpers/joblyApi';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: false
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    let { username, password } = this.state;
    let { token } = await JoblyApi.request('login', { username, password }, "post");
    if (token) {
      this.setState({ error: false })
      localStorage.setItem("token", token);
      this.props.history.push('/companies');
    } else {
      this.setState({ error: true })
    }
  }

  render() {
    return (
      <div>
        <h1 className="m-4 text-center">Login</h1>
        <form onSubmit={this.handleSubmit}  className="mx-auto" style={{maxWidth: "480px"}}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              className="form-control"
              id="username"
              type="text"
              onChange={this.handleChange}
              name="username"
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
            />
          </div>
          <div className="form-group">
            <button className="btn btn-primary">Submit</button>
          </div>
        </form>
        {this.state.error ? "username or password incorrect" : ""}
      </div>
    )
  }
}
