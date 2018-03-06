import React, {Component} from 'react';

export default class CheckoutForm extends Component {
  constructor(props) {
    super(props);

    this.handleOrder = this.handleOrder.bind(this);
  }

  handleOrder(evt) {
    evt.preventDefault();
    const {email, shippingAddress} = evt.target;
    let order;
    if (this.props.order) {
      order = this.props.order;
    }
    else {
      order = {};
    }
    order.email = email.value;
    order.shippingAddress = shippingAddress.value;
    order.status = 'Created';
    this.props.placeOrder(order);
  }

  render() {
    const {products} = this.props;
    if (!products) { return <p>Cart is empty</p> }
    return (
      <div>
        <ul>
          { products.map(product => {
              return <li key={product.product.id}><SingleItem product={product.product} /></li>
            })
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

const SingleItem = (props) => {
  return  (
     <div>
       <p>{props.product.name}</p>
       <img src={props.product.imgUrl} />
     </div>
   )
 }
