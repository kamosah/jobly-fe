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
export default class CompaniesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyList: [],
      loaded: false
    }
  }

  /** */
  async componentDidMount() {
    this.props.ensureLoggedIn();
    try {
      let { companies } = await JoblyApi.request('companies', {}, "get");
      this.setState({ companyList: companies, loaded: true })
    } catch (e) {
      this.props.history.push('/login');
    }
  }

  /** */
  search = async (data) => {
    this.setState({ loaded: false });
    let { companies } = await JoblyApi.request('companies', { search: data.term }, "get");
    this.setState({ companyList: companies, loaded: true });
  }

  /** */
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
        {this.state.loaded ? this.renderCompanyList() : <Spinner />}
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
