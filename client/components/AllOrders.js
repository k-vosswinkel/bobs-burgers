import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchOrders } from '../store/allOrders'

class AllOrders extends Component {
  constructor(props){
    super(props);

    this.state = {
      currentOrder: ''
    }
  }

  componentDidMount(){
    this.props.fetchOrders();
  }

  render() {
    if (!this.props.allOrders.length) {
      return (
        <div>No Orders to See Here!</div>
      )
    } else {
      const { allOrders } = this.props;
      console.log(allOrders);
      return (
        <div>
          {allOrders.map(order => {
            return (
              <Link key={order.id} to={`/orders/${order.id}`}>
              <div>{order.id}</div>
                <div>{order.email}</div>
                <div>{order.shippingAddress}</div>
                <div>{order.status}</div>
                <div>{order.date}</div>
              </Link>
            )
          })}
        </div>
      )
    }
  }
}

// Container
const mapState = ({allOrders, currentOrder}) => ({ allOrders, currentOrder })
const mapDispatch = { fetchOrders }

export default connect(mapState, mapDispatch)(AllOrders);

// Prop Types
// AllOrders.propTypes = {
//   allOrders: PropTypes.array
// }
