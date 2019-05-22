import React, { Component } from 'react';
import JoblyApi from './JoblyApi';

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
        <h1>LoginForm</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            onChange={this.handleChange}
            name="username"
          />
          <br />
          <label htmlFor="password">Password</label>

          <input
            id="password"
            type="text"
            onChange={this.handleChange}
            name="password"
          />
          <br />
          <button>Submit</button>
        </form>
        {this.state.error ? "username or password incorrect" : ""}
      </div>
    )
  }
}
