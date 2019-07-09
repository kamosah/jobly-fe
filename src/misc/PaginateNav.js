import React, { Component } from 'react';
import PropTypes from 'prop-types';
import "./PaginateNav.css";

/**
 * takes props from parent list component
 * renders prev and next page buttons, current page, and total pages num
 */
class PaginateNav extends Component {
  render() {
    return (
      <div className="m-3">
        <button className={`btn ${this.props.prevBtn} btn-sm`} onClick={this.props.prevPage}><i className="fas fa-chevron-left"></i></button>
        <span className="ml-3 mr-3"><b data-testid="page">{this.props.page}</b> of {this.props.numPages}</span>
        <button className={`btn ${this.props.nextBtn} btn-sm`} onClick={this.props.nextPage}><i className="fas fa-chevron-right"></i></button>
      </div>
    );
  }
}

PaginateNav.defaultProps = {
  prevBtn: "prevBtn",
  prevPage: () => null,
  page: 0,
  numPages: 0,
  nextBtn: "nextBtn",
  nextPage: () => null
}

PaginateNav.propTypes = {
  prevBtn: PropTypes.string,
  prevPage: PropTypes.func,
  page: PropTypes.number,
  numPages: PropTypes.number,
  nextBtn: PropTypes.string,
  nextPage: PropTypes.func
}

export default PaginateNav;
