import React, {Component} from 'react';
import { Link } from 'react-router-dom';

const CartDisplay = ({products, handleAdd, handleReduce, hideCart}) => {
  console.log(products);
  if (!products) { return <p>Cart is empty</p> }
  return (
    <div id="cart-display">
      <ul>
      { products.map(product => {
          return <li key={product.id}><SingleItem lineItem={product} name={product.product.name} /><button onClick= {() => handleAdd(product)}>+</button><button onClick={() => handleReduce(product)}>-</button></li>
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
      <p>{lineItem.product.name}</p>
      <img src={lineItem.product.imgUrl} />
      <p>{lineItem.quantity}</p>
      <p>{lineItem.quantity * lineItem.product.price}</p>
    </div>
  )
}

export default CartDisplay;
