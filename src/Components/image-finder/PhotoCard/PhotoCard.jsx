import React from 'react';
import PropTypes from 'prop-types';

import styles from './PhotoCard.module.css';

const PhotoCard = ({
  photo: { webformatURL, largeImageURL, likes, views, comments, downloads },
  openModal,
}) => {
  return (
    <div className={styles.photoCard}>
      <img src={webformatURL} alt="" />

      <div className={styles.stats}>
        <p className={styles.statsItem}>
          <i className="material-icons">thumb_up</i>
          1108{likes}
        </p>
        <p className={styles.statsItem}>
          <i className="material-icons">visibility</i>
          320321{views}
        </p>
        <p className={styles.statsItem}>
          <i className="material-icons">comment</i>
          129{comments}
        </p>
        <p className={styles.statsItem}>
          <i className="material-icons">cloud_download</i>
          176019{downloads}
        </p>
      </div>

      <button
        type="button"
        className={styles.fullscreenButton}
        onClick={() => openModal(largeImageURL)}
      >
        <i className="material-icons">zoom_out_map</i>
      </button>
    </div>
  );
};

PhotoCard.propTypes = {
  photo: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    views: PropTypes.number.isRequired,
    comments: PropTypes.number.isRequired,
    downloads: PropTypes.number.isRequired,
  }).isRequired,
  openModal: PropTypes.func.isRequired,
};

export default PhotoCard;
