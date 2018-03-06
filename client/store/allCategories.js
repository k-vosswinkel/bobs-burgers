import axios from 'axios';
import history from '../history';
import { getCurrentCategory } from './currentCategory'
//using history to push redirects after delete/update/add

// action types
const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES';
const REMOVE_CATEGORY = 'REMOVE_CATEGORY';
const ADD_CATEGORY = 'ADD_CATEGORY';
const UPDATE_CATEGORY = 'UPDATE_CATEGORY';

// action creators
const getAllCategories = categories => ({ type: GET_ALL_CATEGORIES, categories });
const removeCategory = id => ({ type: REMOVE_CATEGORY, id });
const addCategory = category => ({ type: ADD_CATEGORY, category });
const updateCategory = category => ({ type: UPDATE_CATEGORY, category });

// reducer
export default (categories = [], action) => {
  switch (action.type) {
    case GET_ALL_CATEGORIES:
      return action.categories;

    case REMOVE_CATEGORY:
      return categories.filter(category => category.id !== action.id);

    case ADD_CATEGORY:
      return [...categories, action.category]

    case UPDATE_CATEGORY:
      return categories.map(category => (category.id === action.category.id ? action.category : category))

    default:
      return categories;
  }
}

//Thunks
export const fetchCategories = () => {
  return dispatch => {
    return axios.get('/api/categories')
      .then(res => res.data)
      .then(categories => dispatch(getAllCategories(categories)))
      .catch(err => console.error('error fetching categories', err))
  }
}

export const deleteCategory = id => {
  return dispatch => {
    return axios.delete(`/api/categories/${id}`)
      .then(() => {
        dispatch(removeCategory(id));
        history.push(`/categories`);
      })
      .catch(err => console.error(`error deleting category id ${id}`, err))
  }
}


export const postCategory = category => {
  return dispatch => {
    return axios.post('/api/categories', category)
      .then(newCategory => {
        dispatch(addCategory(newCategory.data));
        dispatch(getCurrentCategory(newCategory.data))
        history.push(`/categories/${newCategory.id}`);
      })
      .catch(err => console.error('error creating a new category', err))
  }
}


export const editCategory = category => {
  return dispatch => {
    return axios.put(`/api/categories/${category.id}`, category)
    .then(res => res.data)
    .then(editedCategory => {
      dispatch(updateCategory(editedCategory));
      dispatch(getCurrentCategory(editedCategory))
      history.push(`/categories/${editedCategory.id}`);
    })
    .catch(err => console.error(`error editing category id: ${category.id}`, err))
  }
}
