import React, { Component } from 'react'

export default class EditProfileForm extends Component {
  componentDidMount() {
    this.props.ensureLoggedIn()
  }
  render() {
    return (
      <div>
        <h1>EditProfileForm</h1>
      </div>
    )
  }
}
