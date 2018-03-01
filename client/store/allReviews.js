import axios from 'axios';
import history from '../history';

const GET_ALL_REVIEWS = 'GET_ALL_REVIEWS';

const defaultReviews = []

const getReviews = (reviews) => ({ type: GET_ALL_REVIEWS, reviews});

export default function reducer(state = defaultReviews, action) {
  switch (action.type) {
    case GET_ALL_REVIEWS :
      return action.reviews
    default:
    return state
  }
}

export const fetchReviews = () => dispatch => {
  axios.get('/api/reviews')
  .then(res => dispatch(getReviews(res.data)))
  .catch(err => console.log('Couldn\'t fetch reviews :(', err))
}
