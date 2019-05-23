import React, { Component } from 'react'

export default class NotFound extends Component {
  componentDidMount() {
    this.props.ensureLoggedIn();
  }
  render() {
    const containerStyles = {
      marginTop: "80px",
      textAlign: "center"
    }
    return (
      <div style={containerStyles}>
        <div>
          <img
            src="https://www.indiefolio.com/assets/img/404/404.png"
            alt="404"
            style={{width: "300px", marginBottom: "30px"}}
          />
          <h2>Page Not Found</h2>
        </div>
      </div>
    )
  }
}
