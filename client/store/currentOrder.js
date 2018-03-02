import axios from 'axios';

//Action Types
const GET_CURRENT_ORDER = 'GET_CURRENT_ORDER';

//Action Creators
const getCurrentOrder = order => ({ type: GET_CURRENT_ORDER, order })

//Reducer
export default (currentOrder = {}, action) => {
  switch (action.type) {
    case GET_CURRENT_ORDER:
      return action.order

    default:
      return currentOrder
  }
}

//Thunks
export const fetchCurrentOrder = id => {
  return dispatch => {
    return axios.get(`/api/orders/${id}`)
      .then(res => res.data)
      .then(order => dispatch(getCurrentOrder(order)))
      .catch(err => console.error(`error fetching product id: ${id}`, err))
  }
}
