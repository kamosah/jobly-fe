import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * *** SearchForm.js ***
 * - form to be displayed at the top of companies list and main jobs list
 * - allows users to search for items via keyword
 */
class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = { term: "" };
  }

  /** form submit logic */
  handleSubmit = (evt) => {
    evt.preventDefault();
    this.props.search(this.state);
    this.setState({ term: "" });
  }

  /** form state change logic */
  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="mt-4 form-inline d-flex justify-content-center">
        <input
          className="form-control col-6"
          name="term"
          value={this.state.term}
          onChange={this.handleChange}
          required />
        <button className="ml-2 btn btn-primary">Search</button>
      </form>
    );
  }
}

SearchForm.propTypes = {
  search: PropTypes.func
}

export default SearchForm;
