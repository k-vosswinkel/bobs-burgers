import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { fetchOrders } from '../store/allOrders'

//Component
class UserHome extends Component {
  constructor(props){
    super(props);

    this.state = {
      email: props.email,
      orders: props.orders
    }
  }

  componentDidMount() {
    this.props.fetchOrders();
  }

 render(){
   return (
     <div>
       <h3>Welcome, {this.state.email}</h3>
       <h2>Your Orders:</h2>
       {this.state.orders.map(order => {
         if (this.state.orders.length) {
           return (
             <div key={order.id}>
               <div>{order.id}</div>
               <div>{order.email}</div>
               <div>{order.shippingAddress}</div>
               <div>{order.status}</div>
               <div>{order.date}</div>
             </div>
           )
         } else {
           return <h2>No orders</h2>
         }
       })
       }
     </div>
   )
 }
}

//Container
const mapState = (state) => {
  console.log(state.allOrders)
  return {
    email: state.currentUser.email,
    orders: state.allOrders.filter(order => {
      return order.userId === state.currentUser.id
    })
  }
}

const mapDispatch = { fetchOrders }

export default connect(mapState, mapDispatch)(UserHome)

//Prop Types
UserHome.propTypes = {
  email: PropTypes.string
}
