/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';

import styles from './Modal.module.css';

export default class Modal extends Component {
  state = {};

  modalWindowRef = createRef();

  imgRef = createRef();

  handleBackdropClick = e => {
    const { onClose } = this.props;
    if (this.imgRef.current.contains(e.target)) return;
    if (this.modalWindowRef.current.contains(e.target)) {
      onClose();
    }
  };

  handleWindowKeyPress = e => {
    if (e.code !== 'Escape') return;
    this.props.onClose();
  };

  componentDidMount = () => {
    window.addEventListener('click', this.handleBackdropClick);
    window.addEventListener('keydown', this.handleWindowKeyPress);
  };

  componentWillUnmount = () => {
    window.removeEventListener('click', this.handleBackdropClick);
    window.removeEventListener('keyPress', this.handleWindowKeyPress);
  };

  render() {
    const { largeImageURL } = this.props;
    return (
      <div
        className={styles.overlay}
        onClick={this.handleBackDropClick}
        onKeyPress={this.handleBackDropClick}
        ref={this.modalWindowRef}
      >
        <div className={styles.modal}>
          <img
            src={largeImageURL}
            alt=""
            className={styles.modal}
            ref={this.imgRef}
          />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
