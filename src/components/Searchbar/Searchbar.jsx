import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    query: '',
  };

  handleInputChange = event => {
    this.setState({ query: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.query);
  };

  render() {
    return (
      <header className={css.header}>
        <form className={css.searchForm} onSubmit={this.handleSubmit}>
          <input
            className={css.searchForm__input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.query}
            onChange={this.handleInputChange}
          />
          <button className={css.searchForm__button} type="submit">
            <span className={css.searchForm__emoji}></span>
          </button>
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
