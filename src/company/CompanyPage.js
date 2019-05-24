import React, { Component } from 'react'
import PropTypes from 'prop-types';
import JoblyApi from '../helpers/joblyApi';

import JobsList from '../job/JobsList';
import Spinner from '../misc/Spinner';
import "./CompanyPage.css"

/**
 * 
 */
export default class CompanyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: {},
      loaded: false
    }
  }

  /** */
  async componentDidMount() {
    this.props.ensureLoggedIn();
    try {
      let res = await JoblyApi.request(`companies/${this.props.match.params.handle}`, {}, "get");
      this.props.ensureLoggedIn();
      this.setState({ company: res.company, loaded: true });
    } catch (e) {
      this.props.history.push('/login');
    }
  }

  /** */
  defaultImgOnErr = (e) => {
    e.target.src = this.props.imgDefault;
  }

  /** */
  renderContent() {
    const { handle, name, logo_url, description, num_employees, jobs } = this.state.company;
    return (
      <div>
        <div className="company-jumbo jumbotron mt-5 mx-auto p-4 text-center">
          <h2 className="mb-4">{name}</h2>
          <img
            className="company-page-logo"
            src={logo_url ? logo_url : this.props.imgDefault}
            alt={handle}
            onError={this.defaultImgOnErr}
          />
          <hr className="my-4" />
          <p className="company-desc">{description}</p>
          <p className="num-employees">Employees: {num_employees}</p>
        </div>
        <JobsList ensureLoggedIn={this.props.ensureLoggedIn} jobs={jobs} />
      </div>
    );
  }

  render() {
    return (
      <div className="text-center">
        {this.state.loaded ? this.renderContent() : <div className="mt-5"><Spinner /></div>}
      </div>
    );
  }
}

CompanyPage.defaultProps = {
  imgDefault: "https://www.designevo.com/res/templates/thumb_small/bright-blue-kaleidoscope.png"
}

CompanyPage.propTypes = {
  ensureLoggedIn: PropTypes.func,
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
  imgDefault: PropTypes.string
}
