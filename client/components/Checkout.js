import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editOrder, postOrder, emptyCart } from '../store'
import CheckoutForm from './CheckoutForm';

class Checkout extends Component {

  constructor(props) {
    super(props)

    this.state = {
      isSubmitted: false
    }
  }

  placeOrder = (order) => {
    this.props.editOrder(order);
    this.setState({
      isSubmitted: true
    })
  }

  createOrder = (order) => {
    this.props.postOrder(order, this.props.allCartItems);
    this.setState({
      isSubmitted: true
    })
    this.props.emptyCart();
  }

  render() {
    const {currentUser, currentOrder, allCartItems} = this.props;
    if (Object.keys(currentUser).length) {
      return <CheckoutForm placeOrder={this.placeOrder} order={currentOrder} email={currentUser.email} products={currentOrder.lineItems} />
    }
    else if (this.state.isSubmitted) {
      return <h1>Thank you for completing your order!</h1>
    }
    else {
      return <CheckoutForm placeOrder={this.createOrder} products={allCartItems} />
    }
  }
}

const mapState = ({ allCartItems, currentUser, currentOrder }) => ({ allCartItems, currentUser, currentOrder });

const mapDispatch = { editOrder, postOrder, emptyCart }

export default connect(mapState, mapDispatch)(Checkout);
