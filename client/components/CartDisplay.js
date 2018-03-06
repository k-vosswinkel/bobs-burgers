import React from 'react';
import { Link } from 'react-router-dom';

const CartDisplay = ({products, handleAdd, handleReduce, hideCart}) => {
  if (!products) { return <p>Cart is empty</p> }
  return (
    <div id="cart-display">
      <h3>Cart</h3>
      <ul>
      { products.map(product => {
          return <li key={product.product.id}><SingleItem lineItem={product} name={product.product.name} /><button onClick= {() => handleAdd(product)}>+</button><button onClick={() => handleReduce(product)}>-</button></li>
      })
      }
      </ul>
      <button onClick={hideCart}><Link to="/checkout">Checkout</Link></button>
    </div>
  )
}

const SingleItem = ({lineItem}) => {
 return  (
    <div className="cart-item">
      <p>{lineItem.product.name}</p>
      <img src={lineItem.product.imgUrl} />
      <p>Quantity: {lineItem.quantity}</p>
      <p>Price: {lineItem.quantity * lineItem.product.price}</p>
    </div>
  )
}

export default CartDisplay;
