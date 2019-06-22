import React, { Component } from 'react';
import PropTypes from 'prop-types';
import "./NotFound.css";
import UserContext from '../user/UserContext';

/**
 * *** NotFound.js ***
 * - component to be mounted in case of 404
 */
class NotFound extends Component {
  /** */
  componentDidMount() {
    this.context();
  }

  render() {
    return (
      <div className="not-found-container">
        <div>
          <img
            className="not-found-img"
            src={this.props.imgUrl}
            alt="404"
          />
          <h2 data-testid="not-found">Page Not Found</h2>
        </div>
      </div>
    );
  }
}

NotFound.contextType = UserContext;

NotFound.defaultProps = {
  imgUrl: "https://www.indiefolio.com/assets/img/404/404.png"
}

NotFound.propTypes = {
  imgUrl: PropTypes.string
}

export default NotFound;
