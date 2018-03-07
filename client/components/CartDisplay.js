import React from 'react';
import { Link } from 'react-router-dom';

const CartDisplay = ({products, handleAdd, handleReduce, hideCart}) => {
  if (!products) { return <div id="cart-display"><p>Cart is empty</p></div> }
  return (
    <div id="cart-display">
      <h3>Cart</h3>
      <ul>
        { products.map(product => {
            return <li key={product.product.id}><SingleItem lineItem={product} name={product.product.name} /><button onClick= {() => handleAdd(product)}>+</button><button onClick={() => handleReduce(product)}>-</button></li>
          })
        }
      </ul>
      <Link to="/checkout"><button className="btn btn-success checkout-btn" onClick={hideCart}>Checkout</button></Link>
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
