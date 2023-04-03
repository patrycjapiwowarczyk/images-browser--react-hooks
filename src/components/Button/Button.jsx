import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Button.module.css';

class Button extends Component {
  render() {
    return (
      <div className={css.button__container}>
        <button className={css.button} onClick={this.props.onClick}>
          {this.props.children}
        </button>
      </div>
    );
  }
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Button;
