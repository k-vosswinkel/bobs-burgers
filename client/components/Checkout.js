import React, {Component} from 'react';
import {connect} from 'react-redux';
import {editOrder} from '../store/'

class Checkout extends Component {
  constructor(props) {
    super();
    //receives line items or uses currentOrder
  }

  placeOrder = (order) => {
    this.props.editOrder(order);
  }

  render() {
    const {currentOrder} = this.props;
    return (
      <CheckoutCart placeOrder={this.placeOrder} order={currentOrder} products={currentOrder.lineItems} />
    )
  }
}
class CheckoutCart extends Component {
  constructor(props) {
    super();

    this.handleOrder = this.handleOrder.bind(this);
  }

  handleOrder(evt) {
    evt.preventDefault();
    const {email, shippingAddress} = evt.target;
    let order = this.props.order;
    order["email"] = email.value;
    order["shippingAddress"] = shippingAddress.value;
    order.status = 'Created';
    this.props.placeOrder(order);
  }

  render() {
  const {products, placeOrder} = this.props;
  if (!products) { return <p>Cart is empty</p> }
  return (
    <div id="cart-display">
      <ul>
      { products.map(product => {
          return <li key={product.id}><SingleItem product={product.product} /></li>
        }
      )
    }
      </ul>
      <form onSubmit={this.handleOrder}>
        <label>Email Address: </label><input type="email" name="email" /><br />
        <label>Shipping Address: </label><input type="text" name="shippingAddress" /><br />
        <input type="submit" value="Place Order" />
      </form>
    </div>
  )
  }
}

const mapState = ({currentUser, currentOrder}) => ({currentUser, currentOrder});

const mapDispatch = {editOrder}

export default connect(mapState, mapDispatch)(Checkout);

const SingleItem = (props) => {
  return  (
     <div>
       <p>{props.product.name}</p>
       <img src={props.product.imgUrl} />
     </div>
   )
 }
