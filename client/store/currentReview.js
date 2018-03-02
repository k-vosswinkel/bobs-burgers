import axios from 'axios';

// action types
const GET_SINGLE_REVIEW = 'GET_SINGLE_REVIEW'

// action creator
const getSingleReview = review => ({ type: GET_SINGLE_REVIEW, review });

// reducer
export default (currentReview = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_REVIEW :
      return action.review;
    default:
      return currentReview;
  }
}

// thunks
export const fetchCurrentReview = reviewId => dispatch => {
  axios.get(`/reviews/${reviewId}`)
  .then(foundReview => dispatch(getSingleReview(foundReview.data)))
  .catch(err => console.error(`error fetching review id: ${reviewId}`, err));
}

// import axios from 'axios';
// import history from '../history';
// import {fetchReviews} from './allReviews'

// const GET_CURRENT_REVIEW = 'GET_CURRENT_REVIEW';
// // const ADD_REVIEW = 'ADD_REVIEW';
// // const EDIT_REVIEW = 'EDIT_REVIEW';
// // const DELETE_REVIEW = 'DELETE_REVIEW';

// const defaultReview = {};

// const getCurrentReview = review => ({type: GET_CURRENT_REVIEW, review});
// // const addReview = (review) => ({type: ADD_REVIEW, user, product, review});

// export default function (state = defaultReview, action) {
//   switch (action.type) {
//     case GET_CURRENT_REVIEW :
//       return action.review;
//     // case ADD_REVIEW :
//     //   return action.review;
//     // case EDIT_REVIEW :
//     //   return action.review;
//     // case DELETE_REVIEW :
//     //   return {};
//     default:
//       return state;
//   }
// }

// export const fetchReview = (review) => dispatch => {
//   axios.get(`/api/reviews/${review.id}`)
//   .then(res => dispatch(getCurrentReview(res.data)))
//   .catch(err => console.log(`Couldn't find review ${review.id}`, err));
// }

// export const postReview = (review) => dispatch => {
//   axios.post('/api/reviews', review)
//   .then(res => {
//     dispatch(getCurrentReview(res.data));
//     dispatch(fetchReviews());
//     })
//   .catch(err => console.log(`Couldn't post review`, err));
// }

// export const updateReview = (review) => dispatch => {
//   axios.update(`/api/reviews/${review.id}`, review)
//   .then(res => {
//     dispatch(getCurrentReview(res.data))
//     dispatch(fetchReviews());
//   })
//   .catch(err => console.log(`Couldn't update review ${review.id}`, err))
// }

// export const deleteReview = (review) => dispatch => {
//   axios.delete(`/api/reviews/${review.id}`)
//   .then(() => {
//     dispatch(getCurrentReview({}));
//     dispatch(fetchReviews());
//   })
//   .catch(err => console.log(`Couldn't delete review ${review.id}`, err))
// }

