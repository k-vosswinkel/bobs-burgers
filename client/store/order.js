import axios from 'axios'

//Action Types
const GOT_ONE_ORDER_FROM_SERVER = 'GOT_ONE_ORDER_FROM_SERVER';

//Action Creators
const gotOneOrderFromServer = order => ({ type: GOT_ONE_ORDER_FROM_SERVER, order })

//Thunks
export const oneOrderThunkCreator = (orderId) => {
  return function thunk(dispatch) {
    return axios.get(`/api/orders/${orderId}`)
      .then(res => res.data)
      .then(order => {
        dispatch(gotOneOrderFromServer(order))
      })
      .catch(err => console.error('Getting order unsuccessful', err))
  }
}

//Reducer
export default function (state = {}, action) {
  switch (action.type) {
    case GOT_ONE_ORDER_FROM_SERVER:
      return Object.assign({}, state, { selectedOrder: action.order });
    default: return state
  }
}
