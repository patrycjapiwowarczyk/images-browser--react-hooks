import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

class ImageGalleryItem extends Component {
  handleClick = () => {
    this.props.onImageClick(this.props.image);
  };

  render() {
    return (
      <li className={css.gallery__item}>
        <img
          className={css.gallery__image}
          src={this.props.image.webformatURL}
          alt={this.props.image.tags}
          onClick={this.handleClick}
          loading="lazy"
        />
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  images: PropTypes.array,
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
