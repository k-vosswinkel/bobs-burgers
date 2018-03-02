import axios from 'axios';
import history from '../history';

//Action Types
const GET_ALL_USERS = 'GET_ALL_USERS';
const REMOVE_USER = 'REMOVE_USER';
const ADD_USER = 'ADD_USER';
const UPDATE_USER = 'UPDATE_USER';

//Action Creators
const getAllUsers = products => ({ type: GET_ALL_USERS, products });
const removeUser = id => ({ type: REMOVE_USER, id });
const addUser = product => ({ type: ADD_USER, product })
const updateUser = product => ({ type: UPDATE_USER, product })

//Reducer
export default (users = [], action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.users

    case REMOVE_USER:
      return users.filter(user => user.id !== action.id)

    case ADD_USER:
      return [...users, action.user]

    case UPDATE_USER:
      return users.map(user => (user.id === action.user.id ? action.user : user))

    default:
      return users
  }
}

//Thunks
export const fetchUsers = () => {
  return dispatch => {
    return axios.get('/api/users')
      .then(res => res.data) //do we need res.data line? In GET but not PUT
      .then(users => dispatch(getAllUsers(users)))
      .catch(err => console.error('error fetching users', err))
  }
}

export const deleteUser = id => {
  return dispatch => {
    return axios.delete(`/api/users/${id}`)
      .then(() => {
        dispatch(removeUser(id))
        history.push(`/users`);
      })
      .catch(err => console.error(`error deleting user id: ${id})`, err))
  }
}

export const postUser = user => {
  return dispatch => {
    return axios.post('/api/users', user)
      .then(newUser => {
        dispatch(addUser(newUser));
        history.push(`/users/${newUser.id}`);
      })
      .catch(err => console.error('error creating a new user', err))
  }
}

export const editUser = user => {
  return dispatch => {
    return axios.put(`/api/users/${user.id}`, user)
      //res.data line here?
      .then(editedUser => {
        dispatch(updateUser(editedUser));
        history.push(`/users/${editedUser.id}`);
      })
      .catch(err => console.error(`error editing user id: ${user.id}`, err))
  }
}
