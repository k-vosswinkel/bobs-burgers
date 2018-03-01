import axios from 'axios';

// action types
const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES';
const REMOVE_CATEGORY = 'REMOVE_CATEGORY';
const GET_NEW_CATEGORY = 'GET_NEW_CATEGORY';
const UPDATE_CATEGORY = 'UPDATE_CATEGORY';

// action creators
const getAllCategories = categories => ({
  type: GET_ALL_CATEGORIES,
  categories: categories
});

const removeCategory = id => ({
  type: REMOVE_CATEGORY,
  id: id
});

const getNewCategory = category => ({
  type: GET_NEW_CATEGORY,
  category: category
});

const updateCategory = category => ({
  type: UPDATE_CATEGORY,
  category: category
});

// reducer
export default (categories = [], action) => {
  switch (action.type) {
    case GET_ALL_CATEGORIES:
    return action.categories;

    case REMOVE_CATEGORY:
    return categories.filter(category => category.id !== action.id);

    case GET_NEW_CATEGORY:
    return [...categories, action.category];

    case UPDATE_CATEGORY:
    return categories.map(category => (category.id === action.category.id ? action.category : category))

    default:
    return categories;
  }
}

// thunks
export const fetchCategories = () => {
  return dispatch => {
    return axios.get('/api/categories')
      .then(res => res.data)
      .then(categories => dispatch(getAllCategories(categories)))
      .catch(err => console.error('error fetching categories', err))
  }
}

export const deleteCategory = categoryId => {
  return dispatch => {
    return axios.delete(`/api/categories/${categoryId}`)
      .then(() => dispatch(removeCategory(categoryId)))
      .catch(err => console.error(`error deleting category id ${categoryId}`, err))
  }
}

export const postCategory = category => {
  return dispatch => {
    return axios.post('/api/categories', category)
      .then(newCategory => dispatch(getNewCategory(newCategory)))
      .catch(err => console.error('error creating a new category', err))
  }
}

export const editCategory = category => {
  return dispatch => {
    return axios.put(`/api/products/${category.id}`, category)
      .then(editedCategory => dispatch(updateCategory(editedCategory)))
      .catch(err => console.error(`error editing category id: ${category.id}`, err))
  }
}
