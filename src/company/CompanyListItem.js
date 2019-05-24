import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./CompanyListItem.css"

let imgDefault = "https://www.designevo.com/res/templates/thumb_small/bright-blue-kaleidoscope.png";

/**
 * 
 */
export default class CompanyListItem extends Component {

  /** */
  defaultImgOnErr(e) {
    e.target.src = imgDefault;
  }

  render() {
    const { description, handle, logo_url, name } = this.props;
    return (
      <li className="card mb-3 p-4 bg-light">
        <div className="row no-gutters">
          <div className="col-md-2">
            <img
              className="company-logo mb-2"
              src={logo_url ? logo_url : imgDefault}
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