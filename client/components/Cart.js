import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchCurrentOrder} from '../store/currentOrder.js'
import { Link } from 'react-router-dom';
import {editLineItem, deleteLineItem} from '../store/allLineItems';
import SingleProduct from './SingleProduct';


class CartDisplay extends Component {
  constructor(props) {
    super();
    this.state = { visible: false }
  }

  handleClick = () => {
    !this.state.visible ? this.setState({visible: true}) : this.setState({visible: false});
  }

  addLineItem = (lineItem) => {
    const {currentOrder} = this.props;
    let newLineItem = {
      quantity: lineItem.quantity + 1,
      id: lineItem.id
    }

    this.props.editLineItem(currentOrder.id, newLineItem);
  }

  reduceLineItem = (lineItem) => {
    const {currentOrder} = this.props;
    if (lineItem.quantity <= 1) {
      this.props.deleteLineItem(currentOrder.id, lineItem.id)
    }
    else {
      let newLineItem = {
        quantity: lineItem.quantity - 1,
        id: lineItem.id
      }
      console.log(newLineItem);
      this.props.editLineItem(currentOrder.id, newLineItem);
    }
  }

  render() {
    const {currentOrder} = this.props;
      return (
        <div>
          <button id="cart-btn" onClick={this.handleClick}>Cart</button>
          {this.state.visible ? <Cart hideCart={this.handleClick} products={currentOrder.lineItems} handleAdd={this.addLineItem} handleReduce={this.reduceLineItem} /> : null}
        </div>
      )
    }
}

const Cart = ({products, handleAdd, handleReduce, hideCart}) => {
  if (!products) { return <p>Cart is empty</p> }
  return (
    <div id="cart-display">
      <ul>
      { products.map(product => {
          return <li key={product.id}><SingleItem lineItem={product} /><button onClick= {() => handleAdd(product)}>+</button><button onClick={() => handleReduce(product)}>-</button></li>
      })
      }
      </ul>
      <button onClick={hideCart}><Link to="/checkout">Checkout</Link></button>
    </div>
  )
}

const mapState = ({currentOrder}) => ({currentOrder});

const mapDispatch = {fetchCurrentOrder, editLineItem, deleteLineItem};

export default connect(mapState, mapDispatch)(CartDisplay);

const SingleItem = ({lineItem}) => {
 return  (
    <div>
      <p>{lineItem.product.name}</p>
      <img src={lineItem.product.imgUrl} />
      <p>{lineItem.quantity}</p>
      <p>{lineItem.quantity * lineItem.product.price}</p>
    </div>
  )
}
