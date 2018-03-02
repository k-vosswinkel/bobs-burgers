import axios from 'axios';

// action types
const GET_CURRENT_USER = 'GET_CURRENT_USER'

// action creator
const getCurrentUser = user => ({ type: GET_CURRENT_USER, user });

// reducer
export default (currentUser = {}, action) => {
  switch (action.type) {
    case GET_CURRENT_USER:
      return action.user

    default:
      return currentUser;
  }
}

// thunks
export const fetchCurrentUser = id => {
  return dispatch => {
    return axios.get(`/users/${id}`)
      .then(user => dispatch(getCurrentUser(user)))
      .catch(err => console.error(`error fetching user id: ${id}`, err))
  }
}
