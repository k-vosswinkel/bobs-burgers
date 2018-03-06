import React, {Component} from 'react';
import {connect} from 'react-redux';
import { addItemToCart, deleteItemFromCart } from '../store';
import CartDisplay from './CartDisplay';

class GuestCart extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: false }
  }

  handleClick = () => {
    !this.state.visible ? this.setState({visible: true}) : this.setState({visible: false});
  }

  addLineItem = (lineItem) => {
    // let newLineItem = {
    //   quantity: lineItem.quantity + 1,
    //   id: lineItem.id
    // }
  }

  reduceLineItem = (lineItem) => {
    // const {currentOrder} = this.props;
    // if (lineItem.quantity <= 1) {
    //   this.props.deleteLineItem(currentOrder.id, lineItem.id)
    // }
    // else {
    //   let newLineItem = {
    //     quantity: lineItem.quantity - 1,
    //     id: lineItem.id
    //   }
    //   console.log(newLineItem);
    //   this.props.editLineItem(currentOrder.id, newLineItem);
    // }
  }

  render() {
    const {allCartItems} = this.props;
      return (
        <div>
          <button className="btn btn-danger white" onClick={this.handleClick}>Cart</button>
          {this.state.visible ? <CartDisplay hideCart={this.handleClick} products={allCartItems} handleAdd={this.addLineItem} handleReduce={this.reduceLineItem} /> : null}
        </div>
      )
    }
}

const mapState = ({ allCartItems }) => ({ allCartItems });

const mapDispatch = { addItemToCart, deleteItemFromCart };

export default connect(mapState, mapDispatch)(GuestCart);
