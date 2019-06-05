import React, { Component } from 'react'
import PropTypes from 'prop-types';
import JoblyApi from '../helpers/joblyApi';
import JobListItem from './JobListItem';
import SearchForm from '../misc/SearchForm';
import Spinner from '../misc/Spinner';
import './JobsList.css';

/**
 * 
 */
class JobsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: this.props.jobs || [],
      loaded: false,
      howMany: 0,
      page: 1,
      offset: 0,
      amt: 10
    }
  }

  /**
   * when this component mounts:
   * if no jobs were passed to the list as props, query the db (first page only)
   * while querying, spinner is shown as "loaded" in state is false
   * when data is returned, hide spinner and render list
   */
  async componentDidMount() {
    this.props.ensureLoggedIn();
    try {
      // if no props were passed (main list page)
      if (!this.state.jobs.length) {
        let { jobsAndCount } = await JoblyApi.request('jobs', { offset: this.state.offset, amt: this.state.amt });
        this.setState({ loaded: true, jobs: jobsAndCount[0], howMany: jobsAndCount[1] });
      }
      // if props were passed (company page, profile page)
      else {
        this.setState({ loaded: true });
      }
    } catch (e) {
      console.error(e);
      this.props.history.push('/login');
    }
  }

  /** query the db for next page of jobs */
  nextPage = async () => {
    let newOffset = this.state.offset + this.state.amt;
    if (newOffset < this.state.howMany) {
      try {
        this.setState({ loaded: false })
        let { jobsAndCount } = await JoblyApi.request('jobs', { offset: newOffset, amt: this.state.amt });
        this.setState({ loaded: true, offset: newOffset, page: this.state.page + 1, jobs: jobsAndCount[0], howMany: jobsAndCount[1] });
      } catch (e) {
        console.error(e);
        this.props.history.push('/login');
      }
    }
  }

  /** query the db for previous page of jobs */
  prevPage = async () => {
    let newOffset = this.state.offset - this.state.amt;
    if (newOffset >= 0) {
      try {
        this.setState({ loaded: false })
        let { jobsAndCount } = await JoblyApi.request('jobs', { offset: newOffset, amt: this.state.amt });
        this.setState({ loaded: true, offset: newOffset, page: this.state.page - 1, jobs: jobsAndCount[0], howMany: jobsAndCount[1] });
      } catch (e) {
        console.error(e);
        this.props.history.push('/login');
      }
    }
  }

  /** search jobs by keyword */
  search = async (data) => {
    this.setState({ loaded: false });
    let { jobs } = await JoblyApi.request('jobs', { search: data.term }, "get");
    this.setState({ jobs: jobs, loaded: true });
  }

  /** */
  handleApply = async (id) => {
    try {
      const username = localStorage.getItem("username");
      await JoblyApi.request(`jobs/${id}/apply`,
        { id, username, state: "applied" },
        'post');
    } catch (e) {
      console.error(e);
      this.setState({ isError: true, error: e });
    }
  }

  /** */
  handleUnapply = async (id) => {
    try {
      const username = localStorage.getItem("username");
      await JoblyApi.request(`jobs/${id}/apply`,
        { username },
        'delete');
    } catch (e) {
      console.error(e);
      this.setState({ isError: true, error: e });
    }
  }

  /** render pagination navigation */
  renderPaginateNav = () => {
    let prevBtn = this.state.offset - this.state.amt >= 0 ? "btn-primary" : "btn-muted no-click";
    let nextBtn = this.state.offset + this.state.amt < this.state.howMany ? "btn-primary" : "btn-muted no-click";
    let numPages = this.state.howMany / this.state.amt;
    return (
      <div className="m-3">
        <button className={`btn ${prevBtn} btn-sm`} onClick={this.prevPage}><i className="fas fa-chevron-left"></i></button>
        <span className="ml-3 mr-3">- <b>{this.state.page}</b> - &nbsp;of {numPages}</span>
        <button className={`btn ${nextBtn} btn-sm`} onClick={this.nextPage}><i className="fas fa-chevron-right"></i></button>
      </div>
    );
  }

  /** render list of jobs */
  renderJobList = () => {
    return (
      <ul className="jobs-list mb-5 p-0 mx-auto">
        {this.state.jobs.map(j => (
          <JobListItem key={j.id} {...j} handleApply={this.handleApply} handleUnapply={this.handleUnapply} />
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className="text-center">
        {this.props.jobs ? null : (
          <div>
            <h2 className="mt-4">Jobs</h2>
            <SearchForm search={this.search} />
            {this.renderPaginateNav()}
          </div>
        )}
        {this.state.loaded ? this.renderJobList() : <Spinner />}
      </div>
    );
  }
}

JobsList.propTypes = {
  ensureLoggedIn: PropTypes.func,
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object
}

export default JobsList;
