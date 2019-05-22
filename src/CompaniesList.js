import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import JoblyApi from './JoblyApi';
import CompanyListItem from './CompanyListItem';
import SearchForm from './SearchForm';
import Spinner from './Spinner';

export default class CompaniesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyList: [],
      loaded: false
    }
  } f

  async componentDidMount() {
    try {
      let { companies } = await JoblyApi.request('companies', {}, "get");
      this.setState({ companyList: companies, loaded: true })
    } catch (e) {
      this.props.history.push('/login');
    }
  }

  search = async (data) => {
    this.setState({ loaded: false });
    let { companies } = await JoblyApi.request('companies', { search: data.term }, "get");
    this.setState({ companyList: companies, loaded: true });
  }

  renderCompanyList = () => {
    return (
      <ul>
        {this.state.companyList.map(c => (
          <Link key={c.handle} to={`/companies/${c.handle}`}><CompanyListItem {...c} /></Link>
        ))}
      </ul>
    )
  }

  render() {
    return (
      <div className="d-flex flex-column justify-content-start align-items-center">
        <h2 className="m-4">Companies List</h2>
        <SearchForm search={this.search} />
        {this.state.loaded ? this.renderCompanyList() : <Spinner />}
      </div>
    )
  }
}
