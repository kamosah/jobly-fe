import React, { Component } from 'react'
import JoblyApi from '../helpers/joblyApi';
import JobsList from '../job/JobsList';
import Spinner from '../misc/Spinner';

let imgDefault = "https://www.designevo.com/res/templates/thumb_small/bright-blue-kaleidoscope.png";

export default class CompanyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: {},
      loaded: false
    }
  }

  async componentDidMount() {
    let res = await JoblyApi.request(`companies/${this.props.match.params.handle}`, {}, "get");
    this.props.ensureLoggedIn();
    this.setState({ company: res.company, loaded: true });
  }

  defaultImgOnErr(e) {
    e.target.src = imgDefault;
  }

  renderContent() {
    const { handle, name, logo_url, description, num_employees, jobs } = this.state.company;
    const imgStyles = {
      maxWidth: "120px",
      border: "2px solid #000",
      borderRadius: "10px",
      boxShadow: "1px 1px 3px #333"
    }
    return (
      <div>
        <div className="jumbotron mt-5 mx-auto p-4 text-center" style={{maxWidth: "900px"}}>
          <h2 className="mb-4">{name}</h2>
          <img
            style={imgStyles}
            src={logo_url ? logo_url : imgDefault}
            alt={handle}
            onError={this.defaultImgOnErr}
          />
          <hr className="my-4" />
          <p>{description}</p>
          <p style={{fontSize: "0.9rem", color: "#888"}}>Employees: {num_employees}</p>
        </div>
        <JobsList ensureLoggedIn={this.props.ensureLoggedIn} jobs={jobs} />
      </div>
    );
  }







  render() {
    return (
      <div>
    {this.state.loaded ? this.renderContent() : <Spinner />}
  </div>
  )
}
}
