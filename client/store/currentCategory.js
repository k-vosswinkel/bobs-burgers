import axios from 'axios';

// action types
const GET_CURRENT_CATEGORY = 'GET_CURRENT_CATEGORY'

// action creator
export const getCurrentCategory = category => ({ type: GET_CURRENT_CATEGORY, category });

// reducer
export default (currentCategory = {}, action) => {
  switch (action.type) {
    case GET_CURRENT_CATEGORY:
      return action.category

    default:
      return currentCategory;
  }
}

// thunks
export const fetchCurrentCategory = id => {
  return dispatch => {
    return axios.get(`/api/categories/${id}`)
      .then(res => res.data)
      .then(foundCategory => dispatch(getCurrentCategory(foundCategory)))
      .catch(err => console.error(`error fetching category id: ${id}`, err))
  }
}
