import React, {Component} from 'react';
import {connect} from 'react-redux';
// import { Link } from 'react-router-dom';
import {editLineItem, deleteLineItem} from '../store/allLineItems';
import { Link } from 'react-router-dom';
// import SingleProduct from './SingleProduct';
// import CartDisplay from './CartDisplay';

class GuestCart extends Component {
  constructor(props) {
    super();
    this.state = { visible: false }
  }

  handleClick = () => {
    !this.state.visible ? this.setState({visible: true}) : this.setState({visible: false});
  }

  addLineItem = (lineItem) => {
    let newLineItem = {
      quantity: lineItem.quantity + 1,
      id: lineItem.id
    }

    // this.props.editLineItem(currentOrder.id, newLineItem);
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
    const {allLineItems} = this.props;
    console.log(this.props);
    console.log('hits guest cart', allLineItems);
      return (
        <div>
          <button id="cart-btn" onClick={this.handleClick}>Cart</button>
          {this.state.visible ? <GuestCartDisplay hideCart={this.handleClick} products={allLineItems} handleAdd={this.addLineItem} handleReduce={this.reduceLineItem} /> : null}
        </div>
      )
    }
}

const mapState = ({allLineItems}) => ({allLineItems});

const mapDispatch = {editLineItem, deleteLineItem};

export default connect(mapState, mapDispatch)(GuestCart);

const GuestCartDisplay = ({products, handleAdd, handleReduce, hideCart}) => {
  console.log(products);
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

const SingleItem = ({lineItem}) => {
 return  (
    <div>
      <p>{lineItem.name}</p>
      <img src={lineItem.imgUrl} />
      {/* <p>{lineItem.quantity}</p>
      <p>{lineItem.quantity * lineItem.product.price}</p> */}
    </div>
  )
}
