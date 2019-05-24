import React, { Component } from 'react';

/**
 * 
 */
export default class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = { term: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /** */
  handleSubmit(evt) {
    evt.preventDefault();
    this.props.search(this.state);
    this.setState({ term: "" });
  }

  /** */
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="m-4 form-inline d-flex justify-content-center">
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
