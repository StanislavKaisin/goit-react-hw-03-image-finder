import React, { Component, createRef } from 'react';

import SearchForm from '../SearchForm/SearchForm';
import Gallery from '../Gallery/Gallery';
import Spinner from '../Spinner/Spinner';
import ErrorNotification from '../ErrorNotification/ErrorNotification';

import * as api from '../../../Services/apiImages';

import styles from './ImageFinder.module.css';

const INITIAL_STATE = {
  wordForSearch: '',
  inputWord: '',
  pageNumber: 1,
  totalPages: 1,
  error: null,
  searchResults: [],
  isLoading: false,
};

export default class ImageFinder extends Component {
  state = {
    ...INITIAL_STATE,
  };

  endOfPage = createRef();

  componentDidMount() {
    const { wordForSearch, pageNumber } = this.state;
    api
      .get(wordForSearch, pageNumber)
      .then(data => {
        return this.setState(prevState => {
          return {
            searchResults: [...prevState.searchResults, ...data.hits],
          };
        });
      })
      .catch(error => this.setState({ error, searchResults: [] }))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  componentDidUpdate() {
    this.endOfPage.current.scrollIntoView({
      block: 'end',
    });
  }

  handleChange = e => {
    const { value } = e.target;
    this.setState({
      inputWord: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { inputWord } = this.state;
    const lastWordForSearch = inputWord;
    this.setState(
      prevState => {
        let ifNewWord = false;
        if (prevState.wordForSearch === '') {
          ifNewWord = true;
        }
        if (prevState.wordForSearch !== inputWord) {
          ifNewWord = true;
        } else {
          ifNewWord = false;
        }
        if (ifNewWord) {
          return {
            ...INITIAL_STATE,
            isLoading: true,
            error: null,
            wordForSearch: lastWordForSearch,
            inputWord: lastWordForSearch,
          };
        }
        return {
          isLoading: true,
          error: null,
          wordForSearch: lastWordForSearch,
        };
      },
      () => {
        api
          .get(inputWord, this.state.pageNumber)
          .then(data => {
            const totalPages = Math.ceil(data.totalHits / 12);
            return this.setState(prevState => {
              return {
                searchResults: [...data.hits],
                totalPages,
                pageNumber:
                  prevState.pageNumber + 1 >= totalPages
                    ? totalPages
                    : prevState.pageNumber + 1,
              };
            });
          })
          .catch(error => this.setState({ error, searchResults: [] }))
          .finally(() => this.setState({ isLoading: false }));
      },
    );
  };

  handleLoadMore = e => {
    e.preventDefault();
    const { wordForSearch, totalPages, pageNumber } = this.state;
    this.setState(prevState => {
      return {
        isLoading: true,
        error: null,
        pageNumber:
          prevState.pageNumber + 1 >= totalPages
            ? totalPages
            : prevState.pageNumber + 1,
      };
    });
    api
      .get(wordForSearch, pageNumber)
      .then(data => {
        return this.setState(prevState => {
          return {
            searchResults: [...prevState.searchResults, ...data.hits],
          };
        });
      })
      .catch(error => this.setState({ error, searchResults: [] }))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  render() {
    const {
      inputWord,
      searchResults,
      isLoading,
      error,
      totalPages,
      pageNumber,
    } = this.state;
    return (
      <div className={styles.app}>
        <SearchForm
          search={inputWord}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        />
        {error && <ErrorNotification text={error.message} />}
        {isLoading ? (
          <Spinner />
        ) : (
          <Gallery
            searchResults={searchResults}
            onLoadMore={this.handleLoadMore}
            totalPages={totalPages}
            pageNumber={pageNumber}
            inputWord={inputWord}
          />
        )}
        <div ref={this.endOfPage}></div>
      </div>
    );
  }
}
