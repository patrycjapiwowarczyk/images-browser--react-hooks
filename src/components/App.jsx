import React, { useEffect, useState } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import css from './App.module.css';

const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchingImages = async (query, page) => {
    const perPage = 12;
    const apiKey = '33195802-8138848f2bbeb34e6b62aa9d8';
    const url = `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&pretty=true&page=${page}&per_page=${perPage}`;

    setIsLoading(true);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        Notify.failure('Fetching images failed, please try again later');
      }

      const imageData = await response.json();
      if (imageData.totalHits === 0) {
        Notify.failure('Oops, no images matching');
      }

      setImages(prevImages =>
        page === 1 ? imageData.hits : [...prevImages, ...imageData.hits]
      );

      setTimeout(() => {
        setIsLoading(false);
      }, 600);
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      fetchingImages(query, page);
    }
  }, [query, page]);

  const handleSearching = (event, query) => {
    event.preventDefault();
    setImages([]);
    setPage(1);
    setQuery(query);
  };

  const handleLoadingMore = () => {
    setPage(page + 1);
  };

  const handleImageClick = image => {
    setShowModal(true);
    setSelectedImage(image);
  };

  const closingModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  const scrollToBottom = () => {
    let currentScrollPosition = window.scrollY;
    let targetScrollPosition = document.body.scrollHeight - window.innerHeight;
    let scrollStep = Math.round(
      (targetScrollPosition - currentScrollPosition) / 20
    );

    const smoothScroll = () => {
      currentScrollPosition += scrollStep;
      window.scrollTo(0, currentScrollPosition);

      if (currentScrollPosition < targetScrollPosition) {
        window.requestAnimationFrame(smoothScroll);
      }
    };

    window.requestAnimationFrame(smoothScroll);
  };

  useEffect(() => {
    if (images.length > 0 && !isLoading) {
      scrollToBottom();
    }
  }, [images, isLoading]);

  return (
    <div className={css.container}>
      <Searchbar onSubmit={(event, query) => handleSearching(event, query)} />
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && (
        <Button onClick={handleLoadingMore}>Load more</Button>
      )}
      {showModal && <Modal image={selectedImage} onClose={closingModal} />}
    </div>
  );
};

export default App;
