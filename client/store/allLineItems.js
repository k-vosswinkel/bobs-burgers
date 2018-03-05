import axios from 'axios';
import history from '../history';
import { fetchCurrentOrder } from './currentOrder';
// import {postOrder} from './allOrders'

// action types
const GET_ALL_LINE_ITEMS = 'GET_ALL_LINE_ITEMS';
const REMOVE_LINE_ITEM = 'REMOVE_LINE_ITEM';
const ADD_LINE_ITEM = 'ADD_LINE_ITEM';
const UPDATE_LINE_ITEM = 'UPDATE_LINE_ITEM';

// action creators
const getCurrentLineItems = lineItems => ({ type: GET_ALL_LINE_ITEMS, lineItems });
const removeLineItem = id => ({ type: REMOVE_LINE_ITEM, id });
const addLineItem = lineItem => ({ type: ADD_LINE_ITEM, lineItem });
const updateLineItem = lineItem => ({ type: UPDATE_LINE_ITEM, lineItem });

// reducer
export default (lineItems = [], action) => {
  switch (action.type) {
    case GET_ALL_LINE_ITEMS:
      return action.lineItems;

    case REMOVE_LINE_ITEM:
      return lineItems.filter(lineItem => lineItem.id !== action.id);

    case ADD_LINE_ITEM:
      return [...lineItems, action.lineItems]

    case UPDATE_LINE_ITEM:
      return lineItems.map(lineItem => (lineItem.id === action.lineItem.id ? action.lineItem : lineItem))

    default:
      return lineItems;
  }
}

//Thunks
// export const fetchLineItems = () => {
//   return dispatch => {
//     return axios.get('/api/lineItems')
//     .then(res => res.data)
//     .then(lineItems => dispatch(getAllLineItems(lineItems)))
//     .catch(err => console.error('error fetching categories', err))
//   }
// }

export const fetchLineItems = () => dispatch => {

}

export const deleteLineItem = (orderId, lineItemId) => dispatch => {
  console.log('lineItem in deleteLineITem', lineItemId);
    axios.delete(`/api/${orderId}/lineItems/${lineItemId}`)
    .then(() => {
      // dispatch(removeLineItem(lineItem.data.id));
      dispatch(fetchCurrentOrder(orderId));
    })
    .catch(err => console.error(`error deleting line item id ${lineItemId}`, err))
}

export const postLineItem = (orderId, lineItem) => dispatch => {
  axios.post(`/api/orders/${orderId}/lineItems`, lineItem)
  .then(newLineItem => {
    dispatch(addLineItem(newLineItem.data));
    dispatch(fetchCurrentOrder(orderId))
  })
  .catch(err => console.error('error creating a new line item', err))
}

export const editLineItem = (orderId, lineItem) => {
  return dispatch => {
    return axios.put(`/api/orders/${orderId}/lineItems/${lineItem.id}`, lineItem)
      .then(editedLineItem => {
        // dispatch(updateLineItem(editedLineItem.data));
        dispatch(fetchCurrentOrder(orderId))
        // history.push(`/lineItems/${editedLineItem.data.id}`);
      })
      .catch(err => console.error(`error editing line item id: ${lineItem.id}`, err))
  }
}
