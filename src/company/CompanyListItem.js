import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import companyImg from '../img/company.png';
import "./CompanyListItem.css"

/**
 * displays company information in card form
 */
class CompanyListItem extends Component {

  // if company has no image, render default image
  defaultImgOnErr = (e) => {
    e.target.src = companyImg;
  }

  render() {
    const { description, handle, logo_url, name } = this.props;
    return (
      <li className="card mb-3 p-4 bg-light">
        <div className="row no-gutters">
          <div className="col-md-2">
            <img
              className="company-logo mb-2"
              src={logo_url ? logo_url : companyImg}
              alt={handle}
              onError={this.defaultImgOnErr}
            />
          </div>
          <div className="col-md-10">
            <div className="card-body p-1">
              <Link key={handle} to={`/companies/${handle}`}>
                <h5 className="card-title">{name}</h5>
              </Link>
              <p className="card-text">{description}</p>
            </div>
          </div>
        </div>
      </li>
    );
  }
}

CompanyListItem.defaultProps = {
  description: "description",
  handle: "handle",
  logo_url: "logo_url",
  name: "name"
}

CompanyListItem.propTypes = {
  description: PropTypes.string,
  handle: PropTypes.string,
  logo_url: PropTypes.string,
  name: PropTypes.string
}

export default CompanyListItem;
