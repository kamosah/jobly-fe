import React, { Component } from 'react'
import PropTypes from 'prop-types';
import JoblyApi from '../helpers/joblyApi';
import JobsList from '../job/JobsList';
import Spinner from '../misc/Spinner';
import Alert from '../misc/Alert';
import "./CompanyPage.css"

/**
 * *** CompanyPage.js ***
 * - queries the db to get all company info for individual company
 * - renders company info and all its job postings
 */
class CompanyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: {},
      loaded: false,
      isError: false,
      error: null
    }
  }

  /** when the component mounts, query the db to grab company info */
  async componentDidMount() {
    this.props.ensureLoggedIn();
    try {
      let res = await JoblyApi.request(`companies/${this.props.match.params.handle}`);
      this.props.ensureLoggedIn();
      this.setState({ company: res.company, loaded: true });
    } catch (e) {
      console.error(e);
      this.setState({ isError: true, error: e, loaded: true });
    }
  }

  /** if company has no image, render default image */
  defaultImgOnErr = (e) => {
    e.target.src = this.props.imgDefault;
  }

  /** render company info */
  renderContent() {
    const { handle, name, logo_url, description, num_employees, jobs } = this.state.company;
    return (
      <div>
        {this.state.isError ? <Alert error={this.state.error} /> : null}
        {handle ? (
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
        ) : null}
      </div>
    );
  }

  render() {
    return (
      <div className="text-center" data-testid="content-container">
        {this.state.loaded ? this.renderContent() : <div><Spinner /></div>}
      </div>
    );
  }
}

CompanyPage.defaultProps = {
  ensureLoggedIn: () => null,
  history: {},
  location: {},
  match: { params: { handle: "test" } },
  imgDefault: "https://www.designevo.com/res/templates/thumb_small/bright-blue-kaleidoscope.png"
}


CompanyPage.propTypes = {
  ensureLoggedIn: PropTypes.func,
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
  imgDefault: PropTypes.string
}

export default CompanyPage;
