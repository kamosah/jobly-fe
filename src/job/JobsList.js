import React, { Component } from 'react'
import JoblyApi from '../helpers/joblyApi';
import JobListItem from './JobListItem';
import Spinner from '../misc/Spinner';
import SearchForm from '../misc/SearchForm';

export default class JobsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      loaded: false
    }
  }

  async componentDidMount() {
    this.props.ensureLoggedIn();
    this.setState({ loaded: false })
    if (!this.props.jobs) {
      let { jobs } = await JoblyApi.request('jobs', {}, "get");
      this.setState({ jobs: jobs, loaded: true })
    } else {
      this.setState({ jobs: this.props.jobs, loaded: true })
    }
  }

  search = async (data) => {
    this.setState({ loaded: false });
    let { jobs } = await JoblyApi.request('jobs', { search: data.term }, "get");
    this.setState({ jobs: jobs, loaded: true });
  }

  handleApply = async (id) => {
    try {
      const username = localStorage.getItem("username");
      await JoblyApi.request(`jobs/${id}/apply`, { id, username, state: "applied" }, 'post');
    } catch (e) {
      this.setState({ isError: true, error: e });
    }
  }

  renderJobList = () => {
    return (
      <ul className="mb-5 p-0 mx-auto" style={{ maxWidth: "460px" }}>
        {this.state.jobs.map(j => (
          <JobListItem key={j.id} {...j} handleApply={this.handleApply} />
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className="text-center">
        {this.props.jobs ? null : <h2 className="mt-4">Jobs</h2>}
        {this.props.jobs ? null : <SearchForm search={this.search} />}
        {this.state.loaded ? this.renderJobList() : <Spinner />}
      </div>
    )
  }
}
