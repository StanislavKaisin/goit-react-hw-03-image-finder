import React from 'react';
import PropTypes from 'prop-types';

import styles from './SearchForm.module.css';

const SearchForm = ({ search, onChange, onSubmit }) => {
  return (
    <form className={styles.searchForm} onSubmit={onSubmit}>
      <input
        type="text"
        autoComplete="off"
        placeholder="Search images..."
        value={search}
        onChange={onChange}
        name="inputWord"
      />
    </form>
  );
};

SearchForm.propTypes = {
  search: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default SearchForm;
