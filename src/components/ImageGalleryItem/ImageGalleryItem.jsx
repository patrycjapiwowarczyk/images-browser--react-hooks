import React from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ image, onImageClick }) => {
  const handleClick = () => {
    onImageClick(image);
  };

  return (
    <li className={css.gallery__item}>
      <img
        className={css.gallery__image}
        src={image.webformatURL}
        alt={image.tags}
        onClick={handleClick}
        loading="lazy"
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  images: PropTypes.array,
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
