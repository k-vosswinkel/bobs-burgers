import React, {Component} from 'react';
import {connect} from 'react-redux';
import {oneOrderThunkCreator} from '../store/order';
//import {fetchCurrentOrder} from '../store/currentOrder.js'; <-- after merge

class CartDisplay extends Component {
  constructor(props) {
    super();
    this.state = { visible: false }
  }

  handleClick = () => {
    this.setState({visible: true})
  }

  handleAdd = (product) => {

  }

  handleRemove = (product) => {

  }

  componentDidMount() {
    this.props.oneOrderThunkCreator(27);
  }

  render() {
    const {order} = this.props;
    if (!order) { return null }
    else {
      return (
        <div>
          <button id="cart-btn" onClick={this.handleClick}>Cart</button>
          { this.state.visible ? <Cart products={order.lineItems} handleAdd={this.addLineItem} handleReduce={this.removeLineItem} /> : null }
        </div>
      )
    }
  }
}

const Cart = ({products, handleAdd, handleReduce, handleCheckout}) => {
  if (!products) { return <p>Cart is empty</p> }

  return (
    <div id="cart-display">
      <ul>
      { products.map(product =>
          <li key={product.id}><SingleItem product={product} /><button onClick= {() => handleAdd(product)}>+</button><button onClick={() => handleReduce(product)}>-</button></li>
      )}
      </ul>
      <button onClick={() => handleCheckout}>Checkout</button>
    </div>
  )
}
    //else {
    //   return (order.lineItems ?
    //   <CartContainer products={order.lineItems} handleAdd={this.addLineItem} handleReduce={this.removeLineItem} />
    //   : null
    // )}

// const CartContainer = ({products, handleAdd, handleReduce, handleCheckout}) => (
//   <div id="cart-display">
//     <ul>
//     { products.map(product =>
//         <li key={product.id}><SingleItem product={product} /><button onClick= {() => handleAdd(product)}>+</button><button onClick={() => handleReduce(product)}>-</button></li>
//     )}
//     </ul>
//     <button onClick={() => handleCheckout}>Checkout</button>
//   </div>
// )

const mapState = ({order}) => ({order});

const mapDispatch = {/*fetchCurrentOrder */ oneOrderThunkCreator};

export default connect(mapState, mapDispatch)(CartDisplay);

const SingleItem = ({name, imgUrl}) =>
  (
    <div>
      <p>{name}</p>
      <img src={imgUrl} />
    </div>
  )
