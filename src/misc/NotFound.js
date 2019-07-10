import React, { Component } from 'react';
import notFoundImg from '../img/404.png';
import "./NotFound.css";
import UserContext from '../user/UserContext';

/**
 * component to be mounted in case of 404
 */
class NotFound extends Component {

  componentDidMount() {
    this.context();
  }

  render() {
    return (
      <div className="not-found-container">
        <div>
          <img
            className="not-found-img"
            src={notFoundImg}
            alt="404"
          />
          <h2>Page Not Found</h2>
        </div>
      </div>
    );
  }
}

NotFound.contextType = UserContext;

export default NotFound;
