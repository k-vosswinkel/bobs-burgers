import axios from 'axios'
import history from '../history'

//Action Types
const GOT_ALL_ORDERS_FROM_SERVER = 'GOT_ALL_ORDERS_FROM_SERVER';
const ADD_ORDER = 'ADD_ORDER';
const DELETE_ORDER = 'DELETE_ORDER';
const UPDATE_ORDER = 'UPDATE_ORDER';

//Action Creators
const gotAllOrdersFromServer = orders => ({type: GOT_ALL_ORDERS_FROM_SERVER, orders})
const addOrder = order => ({type: ADD_ORDER, order})
const deleteOrder = orderId => ({type: DELETE_ORDER, orderId})
const updateOrder = (order) => ({type: UPDATE_ORDER, order})

//Thunks
export const gotAllOrdersThunkCreator = () => dispatch => {
  axios.get('/api/orders')
  .then(orders => (dispatch(gotAllOrdersFromServer(orders.data)))
  .catch(err => console.error('Getting all orders unsuccessful', err)))
}

export const postOrder = (order) => dispatch => {
  axios.post('/api/orders', order)
  .then(newOrder => {
    dispatch(addOrder(newOrder.data));
    history.push(`/orders/${newOrder.id}`)
  })
  .catch(err => console.error('Creating order unsuccessful', err));
}


export const deleteOrderThunkCreator = (orderId) => {
  return function thunk(dispatch) {
    return axios.delete(`/api/orders/${orderId}`)
    .then(() => {
      dispatch(deleteOrder(orderId))
    })
    .catch(err => console.error('Deleting order unsuccessful', err))
  }
}

export const updateOrderThunkCreator = (order) => {
  return function thunk(dispatch) {
    let orderId = order.id
    return axios.put(`/api/orders/${orderId}`, order)
    .then(res => res.data)
    .then(updatedOrder => {
      dispatch(updateOrder(orderId))
      history.push(`/orders/${updatedOrder.id}`)
    })
    .catch(err => console.error('Updating order unsuccessful', err))
  }
}

//Reducer
export default function (orders = [], action) {
  switch (action.type) {
    case GOT_ALL_ORDERS_FROM_SERVER:
      return action.orders;
    case ADD_ORDER:
      return Object.assign({}, state, { orders: state.orders.concat(action.order) });
    case DELETE_ORDER:
      return Object.assign({}, state, { orders: state.orders.filter(order => order.id !== action.orderId) });
    case UPDATE_ORDER:
      return Object.assign({}, state, {
        orders: state.orders.map(order => {
          return order.id === action.orderId ? action.order : order
        })
      })
    default:
      return orders
  }
}
