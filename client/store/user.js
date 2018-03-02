import axios from 'axios'
import history from '../history'

//Initial State
const defaultUser = {}

//Action Types
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const UPDATE_USER = 'UPDATE_USER'

//Action Creators
const getUser = user => ({type: GET_USER, user})
const removeUser = userId => ({type: REMOVE_USER, userId})
const updateUser = user => ({type: UPDATE_USER, user})

//Thunk Creators
export const me = () =>
  dispatch =>
    axios.get('/auth/me')
      .then(res =>
        dispatch(getUser(res.data || defaultUser)))
      .catch(err => console.log(err))

export const auth = (email, password, method) =>
  dispatch =>
    axios.post(`/auth/${method}`, { email, password })
      .then(res => {
        dispatch(getUser(res.data))
        history.push('/home')
      }, authError => { // rare example: a good use case for parallel (non-catch) error handler
        dispatch(getUser({error: authError}))
      })
      .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))

export const logout = () =>
  dispatch =>
    axios.post('/auth/logout')
      .then(_ => {
        dispatch(removeUser())
        history.push('/login')
      })
      .catch(err => console.log(err))

export const editUser = (user) => {
  return function thunk(dispatch) {
    let userId = user.id;
    return axios.put(`/api/auth/${userId}`, user)
      .then(res => res.data)
      .then(updatedUser => {
        dispatch(updateUser(userId));
        history.push(`/auth/${updatedUser.id}`);
      })
      .catch(err => console.error('Updating user unsuccessful', err));
  }
}

//Reducer
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case UPDATE_USER:
      return action.user
    default:
      return state
  }
}

//Don't worry about updating methods on users right now
//Add Delete User action and change "remove" to "logout"
