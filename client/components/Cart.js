import React, {Component} from 'react';
import SingleItem from './SingleItem';
import {connect} from 'react-redux';
import {oneOrderThunkCreator} from '../store/order';


class Cart extends Component {
  componentDidMount() {
    this.props.oneOrderThunkCreator(2);
  }

  handleAdd = () => {};

  handleRemove = () => {};

  render() {
    const {order} = this.props;
    if (!order) { return <p>Cart is empty</p> }
    else {
      return (order.lineItems ?
      <CartContainer products={order.lineItems} handleAdd={this.addLineItem} handleReduce={this.removeLineItem} />
      : null
    )}
  }
}

const CartContainer = ({products, handleAdd, handleReduce, handleCheckout}) => (
  <div>
    <ul>
    { products.map(product =>
        <li key={product.id}><SingleItem product={product} /><button onClick= {() => handleAdd(product)}>+</button><button onClick={() => handleReduce(product)}>-</button></li>
    )}
    </ul>
    <button onClick={() => handleCheckout}>Checkout</button>
  </div>
)


const mapState = ({order}) => ({order});

const mapDispatch = {oneOrderThunkCreator};

export default connect(mapState, mapDispatch)(Cart);
