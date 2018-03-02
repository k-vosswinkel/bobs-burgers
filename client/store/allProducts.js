import axios from 'axios';
import history from '../history';
//using history to push redirects after delete/update/add

//Action Types
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
const ADD_PRODUCT = 'ADD_PRODUCT';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

//Action Creators
const getAllProducts = products => ({ type: GET_ALL_PRODUCTS, products });
const removeProduct = id => ({ type: REMOVE_PRODUCT, id });
const addProduct = product => ({ type: ADD_PRODUCT, product })
const updateProduct = product => ({ type: UPDATE_PRODUCT, product })
//condensed these to one line each for clarity

//Reducer
export default (products = [], action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return action.products

    case REMOVE_PRODUCT:
      return products.filter(product => product.id !== action.id)

    case ADD_PRODUCT:
      return [...products, action.product]

    case UPDATE_PRODUCT:
      return products.map(product => (product.id === action.product.id ? action.product : product))

    default:
      return products
  }
}
//updated tabbing in compromise - some tabbing, some spacing

//Thunks
export const fetchProducts = () => {
  return dispatch => {
    return axios.get('/api/products')
      .then(res => res.data) //do we need res.data line? In GET but not PUT
      .then(products => dispatch(getAllProducts(products)))
      .catch(err => console.error('error fetching products', err))
  }
}

export const deleteProduct = id => {
  return dispatch => {
    return axios.delete(`/api/products/${id}`)
      .then(() => {
        dispatch(removeProduct(id))
        history.push(`/products`);
      })
      .catch(err => console.error(`error deleting product id: ${id})`, err))
  }
}
//added redirect

export const postProduct = product => {
  return dispatch => {
    return axios.post('/api/products', product)
      .then(newProduct => {
        dispatch(addProduct(newProduct));
        history.push(`/products/${newProduct.id}`);
      })
      .catch(err => console.error('error creating a new product', err))
  }
}
//added redirect

export const editProduct = product => {
  return dispatch => {
    return axios.put(`/api/products/${product.id}`, product)
    //res.data line here?
    .then(editedProduct => {
      dispatch(updateProduct(editedProduct));
      history.push(`/products/${editedProduct.id}`);
    })
      .catch(err => console.error(`error editing product id: ${product.id}`, err))
  }
}
//added redirect
