import React, { Component } from 'react'
import JoblyApi from './JoblyApi';
import JobsList from './JobsList';
import Spinner from './Spinner';

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
    this.setState({ company: res.company, loaded: true });
  }

  renderContent() {
    const { name, logo_url, description, jobs } = this.state.company;
    return (
      <div>
        <h3>{name}</h3>
        <img src={logo_url} alt={name} />
        <p>{description}</p>
        <JobsList jobs={jobs} />
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
