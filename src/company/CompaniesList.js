import React, { Component } from 'react'
import PropTypes from 'prop-types';
import JoblyApi from '../helpers/joblyApi';
import CompanyListItem from './CompanyListItem';
import SearchForm from '../misc/SearchForm';
import Spinner from '../misc/Spinner';
import Alert from '../misc/Alert';
import "./CompaniesList.css";
import UserContext from '../user/UserContext';
import PaginateNav from '../misc/PaginateNav';

/**
 * *** CompaniesList.js ***
 * - queries the db to get companies and renders to page
 * - queries are made on a page by page basis
 */
class CompaniesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: [],
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
   * query the db (first page only)
   * while querying, spinner is shown as "loaded" in state is false
   * when data is returned, hide spinner and render list
   */
  async componentDidMount() {
    await this.context();
    try {
      let { companiesAndCount } = await JoblyApi.request('companies', { offset: this.state.offset, amt: this.state.amt });
      this.setState({ companies: companiesAndCount[0], howMany: companiesAndCount[1], loaded: true })
    } catch (e) {
      console.error(e);
      this.setState({ isError: true, error: e, loaded: true });
    }
  }

  /** query the db for next page of companies */
  nextPage = async () => {
    let newOffset = this.state.offset + this.state.amt;
    if (newOffset < this.state.howMany) {
      try {
        this.setState({ loaded: false })
        let { companiesAndCount } = await JoblyApi.request('companies', { offset: newOffset, amt: this.state.amt });
        this.setState({ loaded: true, offset: newOffset, page: this.state.page + 1, companies: companiesAndCount[0], howMany: companiesAndCount[1] });
      } catch (e) {
        console.error(e);
        this.setState({ isError: true, error: e, loaded: true });
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
        this.setState({ loaded: true, offset: newOffset, page: this.state.page - 1, companies: companiesAndCount[0], howMany: companiesAndCount[1] });
      } catch (e) {
        console.error(e);
        this.setState({ isError: true, error: e, loaded: true });
      }
    }
  }

  /** search companies by keyword */
  search = async (data) => {
    this.setState({ loaded: false });
    let { companies } = await JoblyApi.request('companies', { search: data.term }, "get");
    this.setState({ companies: companies, loaded: true });
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
  renderCompanyList = () => {
    return (
      <ul className="companies-list mb-5 p-0 mx-auto">
        {this.state.companies.map(c => (
          <CompanyListItem key={c.handle} {...c} />
        ))}
      </ul>
    )
  }

  render() {
    return (
      <div className="text-center" data-testid="companies-list-container">
        {this.state.isError ? <Alert error={this.state.error} /> : null}
        {this.state.howMany !== 0 ? (
          <div>
            <h2>Companies</h2>
            <SearchForm search={this.search} />
            {this.state.loaded ? (
              <div>
                {this.renderPaginateNav()}
                {this.renderCompanyList()}
              </div>
            ) : <Spinner />}
          </div>
        ) : null }
      </div>
    );
  }
}

CompaniesList.contextType = UserContext;

CompaniesList.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object
}

export default CompaniesList;
