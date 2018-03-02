import axios from 'axios';

// action types
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'

// action creator
const getSingleProduct = product => ({
  type: GET_SINGLE_PRODUCT,
  product: product
});

// reducer
export default (currentProduct = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_PRODUCT:
    return action.product

  default:
    return currentProduct;
  }
}

// thunks
export const fetchCurrentProduct = productId => {
  return dispatch => {
    return axios.get(`/products/${productId}`)
      .then(foundProduct => dispatch(getSingleProduct(foundProduct)))
      .catch(err => console.error(`error fetching product id: ${productId}`, err))
  }
}
