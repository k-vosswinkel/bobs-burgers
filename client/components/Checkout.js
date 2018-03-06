import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editOrder, postOrder } from '../store'
import CheckoutForm from './CheckoutForm';

class Checkout extends Component {

  placeOrder = (order) => {
    this.props.editOrder(order);
  }

  createOrder = (order) => {
    this.props.postOrder(order, this.props.allCartItems);
  }

  render() {
    const {currentUser, currentOrder, allCartItems} = this.props;
    if (Object.keys(currentUser).length) {
      return <CheckoutForm placeOrder={this.placeOrder} order={currentOrder} products={currentOrder.lineItems} />
    }
    else {
      return <CheckoutForm placeOrder={this.createOrder} products={allCartItems} />
    }
  }
}

const mapState = ({ allCartItems, currentUser, currentOrder }) => ({ allCartItems, currentUser, currentOrder });

const mapDispatch = { editOrder, postOrder }

export default connect(mapState, mapDispatch)(Checkout);
