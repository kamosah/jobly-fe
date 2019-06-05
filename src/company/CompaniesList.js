import React, { Component } from 'react'
import PropTypes from 'prop-types';
import JoblyApi from '../helpers/joblyApi';
import CompanyListItem from './CompanyListItem';
import SearchForm from '../misc/SearchForm';
import Spinner from '../misc/Spinner';
import "./CompaniesList.css";

/**
 *
 */
class CompaniesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyList: [],
      loaded: false,
      howMany: 0,
      page: 1,
      offset: 0,
      amt: 10
    }
  }

  /**
   * when this component mounts:
   * if no companies were passed to the list as props, query the db (first page only)
   * while querying, spinner is shown as "loaded" in state is false
   * when data is returned, hide spinner and render list
   */
  async componentDidMount() {
    this.props.ensureLoggedIn();
    try {
      let { companiesAndCount } = await JoblyApi.request('companies', { offset: this.state.offset, amt: this.state.amt });
      this.setState({ companyList: companiesAndCount[0], howMany: companiesAndCount[1], loaded: true })
    } catch (e) {
      console.error(e);
      this.props.history.push('/login');
    }
  }

  /** query the db for next page of companies */
  nextPage = async () => {
    let newOffset = this.state.offset + this.state.amt;
    if (newOffset < this.state.howMany) {
      try {
        this.setState({ loaded: false })
        let { companiesAndCount } = await JoblyApi.request('companies', { offset: newOffset, amt: this.state.amt });
        this.setState({ loaded: true, offset: newOffset, page: this.state.page + 1, companyList: companiesAndCount[0], howMany: companiesAndCount[1] });
      } catch (e) {
        console.error(e);
        this.props.history.push('/login');
      }
    }
  }

  /** query the db for previous page of companies */
  prevPage = async () => {
    let newOffset = this.state.offset - this.state.amt;
    if (newOffset >= 0) {
      try {
        this.setState({ loaded: false })
        let { companiesAndCount } = await JoblyApi.request('companies', { offset: newOffset, amt: this.state.amt });
        this.setState({ loaded: true, offset: newOffset, page: this.state.page - 1, companyList: companiesAndCount[0], howMany: companiesAndCount[1] });
      } catch (e) {
        console.error(e);
        this.props.history.push('/login');
      }
    }
  }

  /** search companies by keyword */
  search = async (data) => {
    this.setState({ loaded: false });
    let { companies } = await JoblyApi.request('companies', { search: data.term }, "get");
    this.setState({ companyList: companies, loaded: true });
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

  /** render list of companies */
  renderCompanyList = () => {
    return (
      <ul className="companies-list mb-5 p-0 mx-auto">
        {this.state.companyList.map(c => (
          <CompanyListItem key={c.handle} {...c} />
        ))}
      </ul>
    )
  }

  render() {
    return (
      <div className="text-center">
        <h2 className="mt-4">Companies</h2>
        <SearchForm search={this.search} />
        {this.state.loaded ? (
          <div>
            {this.renderPaginateNav()}
            {this.renderCompanyList()}
          </div>
        ) : <Spinner />}
      </div>
    );
  }
}

CompaniesList.propTypes = {
  ensureLoggedIn: PropTypes.func,
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object
}

export default CompaniesList;