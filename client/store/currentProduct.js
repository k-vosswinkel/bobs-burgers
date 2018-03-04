import axios from 'axios';

// action types
const GET_CURRENT_PRODUCT = 'GET_CURRENT_PRODUCT'

// action creator
export const getCurrentProduct = product => ({
  type: GET_CURRENT_PRODUCT,
  product: product
});

// reducer
export default (currentProduct = {}, action) => {
  switch (action.type) {
    case GET_CURRENT_PRODUCT:
      return action.product

    default:
      return currentProduct
  }
}

// thunks
export const fetchCurrentProduct = id => {
  return dispatch => {
    return axios.get(`/api/products/${id}`)
      .then(res => res.data)
      .then(product => dispatch(getCurrentProduct(product)))
      .catch(err => console.error(`error fetching product id: ${id}`, err))
  }
}
