import React, { Component } from 'react';
import "./NotFound.css";

/**
 * 
 */
export default class NotFound extends Component {

  /** */
  componentDidMount() {
    this.props.ensureLoggedIn();
  }

  render() {
    return (
      <div className="not-found-container">
        <div>
          <img
            className="not-found-img"
            src="https://www.indiefolio.com/assets/img/404/404.png"
            alt="404"
          />
          <h2>Page Not Found</h2>
        </div>
      </div>
    );
  }
}
