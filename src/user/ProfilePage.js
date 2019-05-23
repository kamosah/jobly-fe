import React, { Component } from 'react'

export default class ProfilePage extends Component {
  componentDidMount() {
    this.props.ensureLoggedIn();
  }
  render() {
    return (
      <div>
        <h1>ProfilePage</h1>
      </div>
    )
  }
}
