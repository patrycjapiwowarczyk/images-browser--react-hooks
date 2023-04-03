import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import css from './App.module.css';

class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    isLoading: false,
    showModal: false,
    selectedImage: null,
    prevQuery: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page, images } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.fetchingImages();
    } else if (
      prevState.images.length !== images.length &&
      prevState.images.length !== 0
    ) {
      this.scrollToBottom();
    }
  }

  handleSearching = query => {
    if (query !== this.state.prevQuery) {
      this.setState({ query, images: [], page: 1, prevQuery: query });
    }
  };

  fetchingImages = async () => {
    const { query, page } = this.state;
    const perPage = 12;
    const apiKey = '33195802-8138848f2bbeb34e6b62aa9d8';
    const url = `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&pretty=true&page=${page}&per_page=${perPage}`;

    this.setState({ isLoading: true });

    try {
      const response = await fetch(url);
      if (!response.ok) {
        Notify.failure('Fetching images failed, please try again later');
      }

      const imageData = await response.json();
      if (imageData.totalHits === 0) {
        Notify.failure('Oops, no images matching');
      }

      this.setState(prevState => ({
        images: [...prevState.images, ...imageData.hits],
      }));

      setTimeout(() => {
        this.setState({ isLoading: false });
      }, 600);
    } catch (error) {
      console.log(error.message);
      this.setState({ isLoading: false });
    }
  };

  scrollToBottom = () => {
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

  handleLoadingMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleImageClick = image => {
    this.setState({ showModal: true, selectedImage: image });
  };

  closingModal = () => {
    this.setState({ showModal: false, selectedImage: null });
  };

  render() {
    const { images, isLoading, showModal, selectedImage } = this.state;

    return (
      <div className={css.container}>
        <Searchbar onSubmit={this.handleSearching} />
        <ImageGallery images={images} onImageClick={this.handleImageClick} />
        {isLoading && <Loader />}
        {images.length > 0 && !isLoading && (
          <Button onClick={this.handleLoadingMore}>Load more</Button>
        )}
        {showModal && (
          <Modal image={selectedImage} onClose={this.closingModal} />
        )}
      </div>
    );
  }
}

export default App;
