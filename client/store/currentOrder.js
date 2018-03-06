import axios from 'axios';

//Action Types
const GET_CURRENT_ORDER = 'GET_CURRENT_ORDER';
const REMOVE_CURRENT_ORDER = 'REMOVE_CURRENT_ORDER';

//Action Creators
const getCurrentOrder = order => ({ type: GET_CURRENT_ORDER, order })
const removeCurrentOrder = () => ({ type: REMOVE_CURRENT_ORDER })

//Reducer
export default (currentOrder = {}, action) => {
  switch (action.type) {
    case GET_CURRENT_ORDER :
      return action.order
    case REMOVE_CURRENT_ORDER :
      return {}
    default:
      return currentOrder
  }
}

//Thunks
export const fetchCurrentOrder = id => dispatch => {
    axios.get(`/api/orders/${id}`)
    .then(order => dispatch(getCurrentOrder(order.data)))
    .catch(err => console.error(`error fetching product id: ${id}`, err))
}

export const fetchInitialOrder = () => dispatch => {
  axios.get('api/orders')
  .then(orders => {
    if (orders.data.length && Array.isArray(orders.data)) {
      const pendingOrder = orders.data.find(order => order.status === 'Pending');
      if (pendingOrder) {
      dispatch(getCurrentOrder(pendingOrder));
      }
    }
  })
  .catch(err => console.log('failed to fetch initial order', err))
}

export const resetCurrentOrder = () => dispatch => {
  dispatch(removeCurrentOrder());
}
