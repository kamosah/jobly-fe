import React, { Component } from 'react'
import PropTypes from 'prop-types';
import JoblyApi from '../helpers/joblyApi';
import JobListItem from './JobListItem';
import SearchForm from '../misc/SearchForm';
import Spinner from '../misc/Spinner';
import Alert from '../misc/Alert';
import PaginateNav from '../misc/PaginateNav';
import './JobsList.css';

/**
 * *** JobsList.js ***
 * - queries the db to get jobs and renders to page
 * - queries are made on a page by page basis
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
      amt: 10,
      isError: false,
      error: null
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
      this.setState({ isError: true, error: e, loaded: true });
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
        this.setState({ isError: true, error: e, loaded: true });
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
        this.setState({ isError: true, error: e, loaded: true });
      }
    }
  }

  /** search jobs by keyword */
  search = async (data) => {
    this.setState({ loaded: false });
    let { jobs } = await JoblyApi.request('jobs', { search: data.term }, "get");
    this.setState({ jobs: jobs, loaded: true });
  }

  /** logic to be run when a user clicks "apply" button on list item */
  handleApply = async (id) => {
    try {
      const username = localStorage.getItem("username");
      await JoblyApi.request(`jobs/${id}/apply`,
        { id, username, state: "applied" },
        'post');
    } catch (e) {
      console.error(e);
      this.setState({ isError: true, error: e, loaded: true });
    }
  }

  /** logic to be run when a user clicks "unapply" button on list item */
  handleUnapply = async (id) => {
    try {
      const username = localStorage.getItem("username");
      await JoblyApi.request(`jobs/${id}/apply`,
        { username },
        'delete');
    } catch (e) {
      console.error(e);
      this.setState({ isError: true, error: e, loaded: true });
    }
  }

  /** render pagination navigation */
  renderPaginateNav = () => {
    let prevBtn = this.state.offset - this.state.amt >= 0 ? "btn-primary" : "btn-muted no-click";
    let nextBtn = this.state.offset + this.state.amt < this.state.howMany ? "btn-primary" : "btn-muted no-click";
    let numPages = this.state.howMany / this.state.amt;
    return (
      <PaginateNav
        prevBtn={prevBtn}
        prevPage={this.prevPage}
        page={this.state.page}
        numPages={numPages}
        nextBtn={nextBtn}
        nextPage={this.nextPage}
      />
    );
  }

  /** render list */
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
        {this.props.jobs ? this.renderJobList() : (
          <div>
            {this.state.isError ? <Alert error={this.state.error} /> : null}
            {this.state.howMany !== 0 ? (
              <div>
                <h2>Jobs</h2>
                <SearchForm search={this.search} />
                {this.state.loaded ? (
                  <div>
                    {this.renderPaginateNav()}
                    {this.renderJobList()}
                  </div>
                ) : <Spinner />}
              </div>
            ) : null}
          </div>
        )}
      </div>
    );
  }
}

JobsList.propTypes = {
  ensureLoggedIn: PropTypes.func,
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
  jobs: PropTypes.array
}

export default JobsList;
