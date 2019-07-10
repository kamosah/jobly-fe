import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import formatSalary from '../helpers/formatSalary';
import "./JobListItem.css"

/**
 * displays card for individual job listing via props passed
 */
class JobListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: {},
      isError: false,
      applyState: this.props.state
    }
  }

  apply = async () => {
    try {
      await this.props.handleApply(this.props.id);
      this.setState({ applyState: "applied" });
    } catch (e) {
      console.error(e);
      this.setState({ isError: true, error: e });
    }
  }

  unapply = async () => {
    try {
      this.props.handleUnapply(this.props.id);
      this.setState({ applyState: null });
    } catch (e) {
      console.error(e);
      this.setState({ isError: true, error: e });
    }
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
                ) : null}
                {name ? <br /> : null}
                Salary: {formatSalary(salary)}
                <br />
                Equity: {equity}
              </p>
              {this.state.applyState ? (
                <button className="btn btn-secondary btn-sm" onClick={this.unapply}>Unapply</button>
              ) : (
                  <button className="btn btn-primary btn-sm" onClick={this.apply}>Apply</button>
                )}
            </div>
          </div>
        </div>
      </li>
    );
  }
}

JobListItem.defaultProps = {
  company_handle: "company_handle",
  equity: 0,
  handleApply: () => null,
  id: 0,
  salary: 0,
  state: "state",
  title: "title"
}

JobListItem.propTypes = {
  company_handle: PropTypes.string,
  equity: PropTypes.number,
  handleApply: PropTypes.func,
  id: PropTypes.number,
  salary: PropTypes.number,
  state: PropTypes.string,
  title: PropTypes.string
}

export default JobListItem;
