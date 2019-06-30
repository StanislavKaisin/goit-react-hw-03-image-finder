import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PhotoCard from '../PhotoCard/PhotoCard';
import Modal from '../Modal/Modal';

import styles from './Gallery.module.css';

export default class Gallery extends Component {
  state = { isModalOpen: false, largeImageURL: '' };

  handleCloseModal = () => {
    this.setState({ isModalOpen: false });
  };

  handleOpenModal = largeImageURL => {
    this.setState({ isModalOpen: true, largeImageURL });
  };

  render() {
    const { isModalOpen, largeImageURL } = this.state;
    const { searchResults, onLoadMore, totalPages, pageNumber } = this.props;
    return (
      <div>
        <ul className={styles.gallery}>
          {searchResults.length ? (
            searchResults.map(photo => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                openModal={this.handleOpenModal}
                isModalOpen={isModalOpen}
              />
            ))
          ) : (
            <h2>No matching results</h2>
          )}
        </ul>
        {pageNumber < totalPages ? (
          <button type="button" onClick={onLoadMore} className={styles.button}>
            Load more
          </button>
        ) : null}
        {isModalOpen && (
          <Modal
            onClose={this.handleCloseModal}
            largeImageURL={largeImageURL}
          />
        )}
      </div>
    );
  }
}

Gallery.propTypes = {
  searchResults: PropTypes.arrayOf(Object),
  onLoadMore: PropTypes.func.isRequired,
  totalPages: PropTypes.number.isRequired,
  pageNumber: PropTypes.number.isRequired,
};

Gallery.defaultProps = {
  searchResults: [],
};
