import React, { Component } from 'react'
import JoblyApi from './JoblyApi';
import JobListItem from './JobListItem';
import { Link } from 'react-router-dom';
import Spinner from './Spinner';
import SearchForm from './SearchForm';

export default class JobsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      loaded: false
    }
  }

  async componentDidMount() {
    this.setState({loaded: false})
    if (!this.props.jobs) {
      let { jobs } = await JoblyApi.request('jobs', {}, "get");
      this.setState({ jobs: jobs, loaded: true })
    } else {
      this.setState({ jobs: this.props.jobs, loaded: true })
    }
  }

  search = async (data) => {
    this.setState({ loaded: false });
    let { jobs } = await JoblyApi.request('jobs', {search: data.term}, "get");
    this.setState({ jobs: jobs, loaded: true });
  }

  renderJobList = () => {
    return (
      <ul>
        {this.state.jobs.map(j => (
          <Link key={j.id} to={`/jobs/${j.id}`}><JobListItem {...j} /></Link>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className="d-flex flex-column justify-content-start align-items-center">
        {this.props.jobs ? null : <h2 className="m-4">Jobs List</h2>}
        <SearchForm search={this.search}/>
        {this.state.loaded ? this.renderJobList() : <Spinner />}
      </div>
    )
  }
}
