import React, { Component } from 'react'
import PropTypes from 'prop-types';

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

Logout.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object
}
