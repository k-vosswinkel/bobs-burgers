import React, {Component} from 'react';
import SingleItem from './SingleItem';
import {connect} from 'react-redux';

class Cart extends Component {

    // props - list of products, handleadd, handleremove, handlecheckout


  constructor(props){
    super();
  }

  handleAdd = (product) => {

  }

  render() {
    return (
      <div>
        <ul>
        {
          this.props.products.length ? props.products.map(product =>
            <li key={product.id}><SingleItem product={product} /><button onClick= {() => this.props.handleAdd(product)}>+</button><button onClick={() => this.props.handleRemove(product)}>-</button></li>
          ) : null
        }
      </ul>
      <button onClick={() => this.props.handleCheckOut}>Checkout</button>
      </div>
    )
  }
}

const mapState = () => {

}
const mapDispatch = null;

export default connect(mapState, mapDispatch)(Cart);
