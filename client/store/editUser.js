import axios from 'axios';
import history from '../history';

//Action Types
const GET_USER_TO_EDIT = 'GET_USER_TO_EDIT';
const EDIT_USER = 'EDIT_USER';

//Action Creators
const getUserToEdit = user => ({ type: GET_USER_TO_EDIT, user })
const editUser = user => ({ type: EDIT_USER, user})

//Reducer
export default (userToEdit = {}, action) => {
  switch (action.type) {
    case GET_USER_TO_EDIT:
      return action.user
    case EDIT_USER:
      return action.user
    default:
      return userToEdit
  }
}

//Thunks
export const fetchUserToEdit = id => {
  return dispatch => {
    return axios.get(`/api/users/${id}`)
      .then(res => res.data)
      .then(user => dispatch(getUserToEdit(user)))
      .catch(err => console.error(`error fetching user to edit with id: ${id}`, err))
  }
}

export const updateUserToEdit = user => {
  return dispatch => {
    return axios.put(`/api/users/${user.id}`, user)
      .then(res => res.data)
      .then(editedUser => {
        dispatch(editUser(editedUser));
        history.push(`/users`);
      })
      .catch(err => console.error(`error editing user id: ${user.id}`, err))
  }
}
