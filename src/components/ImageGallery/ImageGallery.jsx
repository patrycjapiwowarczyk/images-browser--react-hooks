import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

class ImageGallery extends Component {
  render() {
    return (
      <ul className={css.gallery}>
        {this.props.images.map(image => (
          <ImageGalleryItem
            key={`${image.id}`}
            image={image}
            onImageClick={this.props.onImageClick}
          />
        ))}
      </ul>
    );
  }
}

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGallery;
