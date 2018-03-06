import axios from 'axios';

// action types
const GET_ALL_CART_ITEMS = 'GET_ALL_CART_ITEMS';
const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM';
const ADD_CART_ITEM = 'ADD_CART_ITEM';
const UPDATE_CART_ITEM = 'UPDATE_CART_ITEM';
const RESET_CART_ITEMS = 'RESET_CART_ITEMS';

// action creators
const getCurrentCartItems = cartItems => ({ type: GET_ALL_CART_ITEMS, cartItems });
const removeCartItem = cartItem => ({ type: REMOVE_CART_ITEM, cartItem });
const addCartItem = cartItem => ({ type: ADD_CART_ITEM, cartItem });
const updateCartItem = cartItem => ({ type: UPDATE_CART_ITEM, cartItem });
const resetCartItems = () => ({type: RESET_CART_ITEMS})

// const getCartLineItems = lineItems => ({ type: GET_ALL_LINE_ITEMS, })

// reducer
export default (cartItems = [], action) => {
  switch (action.type) {
    case GET_ALL_CART_ITEMS:
      return action.cartItems;

    case REMOVE_CART_ITEM:
      return cartItems.filter(lineItem => lineItem.id !== action.id);

    case ADD_CART_ITEM:
      return [...cartItems, action.lineItems]

    case UPDATE_CART_ITEM:
      return cartItems.map(lineItem => (lineItem.id === action.lineItem.id ? action.lineItem : lineItem))
    case RESET_CART_ITEMS:
      return [];
    default:
      return cartItems;
  }
}

export const fetchCartItems = () => dispatch => {
  if (!window.sessionStorage.getItem('cartItems')) {
    return dispatch(getCurrentCartItems([]));
  }
  let lineItems = window.sessionStorage.getItem('cartItems').split(',');
  let cache = {};
  lineItems.forEach(lineItem => {
    if (cache[lineItem]) {
      cache[lineItem] = cache[lineItem] + 1;
    } else {
      cache[lineItem] = 1;
    }
  });
  Promise.all(Object.keys(cache).map(lineItem =>
    axios.get(`/api/products/${lineItem}`)
    .then(result => ({ product: result.data, quantity: cache[result.data.id]}))))
  .then(createdLineItems => {
    dispatch(getCurrentCartItems(createdLineItems))
  })
}

export const emptyCart = () => dispatch => {
  dispatch(resetCartItems());
}

export const addItemToCart = (item) => dispatch => {
  // let lineItems = window.sessionStorage.getItem('lineItems').split(',');
  // if (lineItems.indexOf === -1)
  // let lineItem = {
  //   product: product,
  //   quantity: 1
  // }
  // dispatch(addLineItem())
}

export const deleteItemFromCart = () => dispatch => {

}

