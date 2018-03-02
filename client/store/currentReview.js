import axios from 'axios';

//Action Types
const GET_CURRENT_REVIEW = 'GET_CURRENT_REVIEW';

//Action Creators
const getCurrentReview = review => ({ type: GET_CURRENT_REVIEW, review });

// reducer
export default (currentReview = {}, action) => {
  switch (action.type) {
    case GET_CURRENT_REVIEW :
      return action.review;
    default:
      return currentReview;
  }
}

//Thunks
export const fetchReview = (review) => dispatch => {
  axios.get(`/api/reviews/${review.id}`)
    .then(res => dispatch(getCurrentReview(res.data)))
    .catch(err => console.log(`Couldn't find review ${review.id}`, err));
}

