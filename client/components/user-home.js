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
    let userOrders = this.props.orders.filter(order => {
      return order.userId === this.props.userId
    })
    if (!userOrders.length){
      return (
        <div>
          <h3>Welcome {this.state.email}</h3>
          <div>You Have No Orders</div>
        </div>
      )
    } else {
     return (
      <div>
         <h3>Welcome, {this.state.email}</h3>
         <h2>Your Orders:</h2>
         {
           userOrders.map(order => {
            return (
              <div key={order.id}>
                <div>{order.id}</div>
                <div>{order.email}</div>
                <div>{order.shippingAddress}</div>
                <div>{order.status}</div>
                <div>{order.date}</div>
              </div>
            )
          })
        }
      </div>
    )
    }
  }
}

//Container
const mapState = (state) => {
  return {
    userId: state.currentUser.id,
    email: state.currentUser.email,
    orders: state.allOrders
  }
}

const mapDispatch = { fetchOrders }

export default connect(mapState, mapDispatch)(UserHome)

//Prop Types
UserHome.propTypes = {
  email: PropTypes.string
}
