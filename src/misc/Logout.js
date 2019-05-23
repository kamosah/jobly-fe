import React, { Component } from 'react'

export default class Logout extends Component {
  componentDidMount() {
    localStorage.removeItem('token');
    this.props.history.push('/');
  }
  render() {
    return (
      <div />
    )
  }
}
