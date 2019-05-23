import React, { Component } from 'react'

export default class AddCompanyForm extends Component {
  componentDidMount() {
    this.props.ensureLoggedIn();
  }
  render() {
    return (
      <div>
        <h1>AddCompanyForm</h1>
      </div>
    )
  }
}
