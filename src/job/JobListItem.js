import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import formatSalary from '../helpers/formatSalary';

export default class JobListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: {},
      isError: false,
      applyState: this.props.state
    }
  }

  applyClick = () => {
    this.props.handleApply(this.props.id);
    this.setState({ applyState: "applied" });
  }
  
  render() {
    const { id, title, salary, equity, company_handle, name } = this.props;
    return (
      <li className="card mb-4 bg-light">
        <div className="row no-gutters">
          <div className="col-md-12">
            <h5 className="card-header">{title}</h5>
            <div className="card-body p-3">
              <p className="card-text">
                {name ? (
                  <span>
                    <span>Company: </span>
                    <Link key={id} to={`/companies/${company_handle}`}>{name}</Link>
                  </span>
                  ) : null }
                {name ? <br/> : null }
                Salary: {formatSalary(salary)}
                <br/>
                Equity: {equity}
              </p>
              {this.state.applyState ? (
                <button className="btn btn-muted btn-sm" style={{pointerEvents: "none"}}>Applied</button>
              ) : (
                <button className="btn btn-primary btn-sm" onClick={this.applyClick}>Apply</button>
              )}
            </div>
          </div>
        </div>
      </li>
    );
  }
}