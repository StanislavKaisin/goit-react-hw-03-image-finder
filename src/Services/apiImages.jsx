import axios from 'axios';
import PropTypes from 'prop-types';

const PATH =
  'https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=';

const API_KEY = '12823560-a45133ed02e1239de959cde23';

export const get = (keyWord, pageNumber) => {
  const query = `${PATH}${keyWord}&page=${pageNumber}&per_page=12&key=${API_KEY}`;
  return axios.get(query).then(({ data }) => {
    return data;
  });
};

get.propTypes = {
  keyWord: PropTypes.string,
  selectedCategory: PropTypes.string,
};
export default get;
