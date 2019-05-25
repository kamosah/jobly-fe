import React, { Component } from 'react';
import PropTypes from 'prop-types';
import "./NotFound.css";

/**
 * 
 */
class NotFound extends Component {

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
            src={this.props.imgUrl}
            alt="404"
          />
          <h2>Page Not Found</h2>
        </div>
      </div>
    );
  }
}

NotFound.propTypes = {
  ensureLoggedIn: PropTypes.func,
  imgUrl: PropTypes.string
}

NotFound.defaultProps = {
  imgUrl: "https://www.indiefolio.com/assets/img/404/404.png"
}

export default NotFound;
