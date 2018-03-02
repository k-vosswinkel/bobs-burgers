import axios from 'axios';

// action types
const GET_SINGLE_CATEGORY = 'GET_SINGLE_CATEGORY'

// action creator
const getSingleCategory = category => ({ type: GET_SINGLE_CATEGORY, category });

// reducer
export default (currentCategory = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_CATEGORY:
      return action.category
    default:
      return currentCategory;
  }
}

// thunks
export const fetchCurrentCategory = categoryId => {
  return dispatch => {
    return axios.get(`/products/${categoryId}`)
      .then(foundCategory => dispatch(getSingleCategory(foundCategory)))
      .catch(err => console.error(`error fetching product id: ${categoryId}`, err))
  }
}
