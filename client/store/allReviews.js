import axios from 'axios';

// action types
const GET_ALL_REVIEWS = 'GET_ALL_REVIEWS';
const REMOVE_REVIEW = 'REMOVE_REVIEW';
const ADD_REVIEW = 'ADD_REVIEW';
const UPDATE_REVIEW = 'UPDATE_REVIEW';

// action creators
const getAllReviews = reviews => ({ type: GET_ALL_REVIEWS, reviews });
const removeReview = id => ({type: REMOVE_REVIEW, id });
const addReview = review => ({ type: ADD_REVIEW, review })
const updateReview = review => ({ type: UPDATE_REVIEW, review })

// reducer
export default (reviews = [], action) => {
  switch (action.type) {
    case GET_ALL_REVIEWS:
      return action.reviews
    case REMOVE_REVIEW :
      return reviews.filter(review => review.id !== action.id)
    case ADD_REVIEW :
      return [...reviews, action.review];
    case UPDATE_REVIEW :
      return reviews.map(review => (review.id === action.review.id ? action.review : review))
    default:
      return reviews;
  }
}

// thunks
export const fetchReviews = () => dispatch => {
  axios.get('/api/reviews')
    .then(reviews => dispatch(getAllReviews(reviews.data)))
  .catch(err => console.error('error fetching reviews', err))
}

export const deleteReview = review => dispatch => {
  axios.delete(`/api/reviews/${review.id}`)
  .then(() => dispatch(removeReview(review.id)))
  .catch(err => console.error(`error deleting review id: ${review.id})`, err))
}

export const postReview = review => dispatch => {
    axios.post('/api/reviews', review)
    .then(newReview => dispatch(addReview(newReview.data)))
    .catch(err => console.error('error creating a new review', err))
}

export const editReview = review => dispatch => {
  axios.put(`/api/reviews/${review.id}`, review)
  .then(editedReview => dispatch(updateReview(editedReview.data)))
  .catch(err => console.error(`error editing review id: ${review.id}`, err))
}

