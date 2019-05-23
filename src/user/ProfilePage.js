import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ProfilePage extends Component {
  render() {
    return (
      <div>
        <h1>ProfilePage</h1>
        <Link to="profile/edit/">Edit Profile</Link>
      </div>
    )
  }
}
