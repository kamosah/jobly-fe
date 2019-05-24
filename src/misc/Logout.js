import React, { Component } from 'react'

/**
 * 
 */
export default class Logout extends Component {

  /** */
  componentDidMount() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.props.history.push('/');
  }
  
  render() {
    return (
      <div />
    )
  }
}
