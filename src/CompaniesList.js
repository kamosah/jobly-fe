import React, { Component } from 'react'
import JoblyApi from './JoblyApi';
import CompanyListItem from './CompanyListItem';
import { Link } from 'react-router-dom';

export default class CompaniesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyList: []
    }
  }

  async componentDidMount() {
    console.log("GETTING COMPANIES");
    let res = await JoblyApi.request('companies', {}, "get");
    console.log(res.companies.length);
    this.setState({companyList: res.companies})
  }

  renderCompanyList = () => {
    return (
      <ul>
        {this.state.companyList.map(c => (
            <Link key={ c.handle } to={`/companies/${c.handle}`}><CompanyListItem {...c}/></Link>
        ))}
      </ul>
    )
  }

  render() {
    return (
      <div>
        <h1>CompaniesList</h1>
        {this.renderCompanyList()}
      </div>
    )
  }
}
