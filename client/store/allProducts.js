import axios from 'axios';

// action types
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
const GET_NEW_PRODUCT = 'GET_NEW_PRODUCT';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

// action creators
const getAllProducts = products => ({
  type: GET_ALL_PRODUCTS,
  products: products
});

const removeProduct = id => ({
  type: REMOVE_PRODUCT,
  id: id
});

const getNewProduct = product => ({
  type: GET_NEW_PRODUCT,
  product: product
})

const updateProduct = product => ({
  type: UPDATE_PRODUCT,
  product: product
})

// reducer
export default (products = [], action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
    return action.products;

    case REMOVE_PRODUCT:
    return products.filter(product => product.id !== action.id)

    case GET_NEW_PRODUCT:
    return [...products, action.product];

    case UPDATE_PRODUCT:
    return products.map(product => (product.id === action.product.id ? action.product : product))

    default:
    return products;
  }
}


// thunks
export const fetchProducts = () => {
  return dispatch => {
    return axios.get('/api/products')
      .then(res => res.data)
      .then(products => dispatch(getAllProducts(products)))
      .catch(err => console.error('error fetching products', err))
  }
}

export const deleteProduct = id => {
  return dispatch => {
    return axios.delete(`/api/products/${id}`)
      .then(() => dispatch(removeProduct(id)))
      .catch(err => console.error(`error deleting product id: ${id})`, err))
  }
}

export const postProduct = product => {
  return dispatch => {
    return axios.post('/api/products', product)
      .then(newProduct => dispatch(getNewProduct(newProduct)))
      .catch(err => console.error('error creating a new product', err))
  }
}

export const editProduct = product => {
  return dispatch => {
    return axios.put(`/api/products/${product.id}`, product)
      .then(editedProduct => dispatch(updateProduct(editedProduct)))
      .catch(err => console.error(`error editing product id: ${product.id}`, err))
  }
}
