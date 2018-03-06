import React, {Component} from 'react'
import NewProduct from './NewProduct';
import {connect} from 'react-redux';
import {fetchCurrentProduct, deleteProduct, postOrder, postLineItem, addCartItem, fetchCartItems} from '../store';
import Reviews from './Reviews';

class SingleProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentProduct: this.props.currentProduct,
      isEditing: false
    }
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  componentDidMount() {
    const productId = Number(this.props.match.params.productId)
    this.props.fetchCurrentProduct(productId)
  }

  componentWillReceiveProps(newProps, oldProps) {
    if (newProps.currentProduct !== oldProps.currentProduct) {
      this.setState({
        currentProduct: newProps.currentProduct
      })
    }
  }

  handleEdit() {
    this.setState({isEditing: !this.state.isEditing})
  }

  handleDelete (event) {
    event.preventDefault()
    this.props.deleteProduct(this.state.currentProduct.id)
  }

  handleAdd(event) {
    event.preventDefault();
    const {currentProduct, currentOrder, currentUser} = this.props;
    let newLineItem = {
      quantity: 1,
      productId: currentProduct.id
    }
    if (!Object.keys(currentUser).length) {
      if (!window.sessionStorage.getItem('cartItems')) {
        window.sessionStorage.setItem('cartItems', currentProduct.id);
      }
      else {
        let arrNew = window.sessionStorage.getItem('cartItems').split(',');
        arrNew.push(currentProduct.id);
        window.sessionStorage.setItem('cartItems', arrNew);
      }
      this.props.fetchCartItems();
    }

    else if (!Object.keys(currentOrder).length) {
      this.props.postOrder({status: 'Pending', userId: currentUser.id}, [newLineItem]);
    }
    else {
      newLineItem.orderId = currentOrder.id;
      this.props.postLineItem(currentOrder.id, [newLineItem]);
    }
  }

  render() {
    const currentProduct = this.state.currentProduct;
    if (!currentProduct) return <div />; // the product id is invalid or the data isnt loaded yet

    if (this.state.isEditing) {
      return (
        <NewProduct product={this.state.currentProduct} handleEdit={this.handleEdit} />
      )
    }

     else {
      return (
      <div>
        <div>
          <div className="page-header">
            <h2>{currentProduct.name}</h2>
              { this.props.currentUser.isAdmin ? <p> Current Inventory: {currentProduct.inventory} </p> : null }
              <button onClick={this.handleEdit} className="btn btn-warning new">Edit Product </button>
              <button onClick={this.handleDelete} className="btn btn-danger new">Delete Product</button>
          </div>
        </div>

        <div className="page-body">
          <button className="btn btn-success new" onClick={this.handleAdd}>Add To Cart</button>
          <p>Price: {currentProduct.price} </p>
          <p>Description: {currentProduct.description} </p>
          <ul>Categories: {currentProduct.categories && currentProduct.categories.map(category => {
              return (
                <li key={category.id}>{category.name}</li>
                )
              })
              }
            </ul>
          <img src={currentProduct.imageUrl} />
        </div>
      <Reviews />
    </div>
    )
    }
  }
}

const mapState = ({ currentProduct, currentUser, currentOrder }) => ({ currentProduct, currentUser, currentOrder })

const mapDispatch = { fetchCurrentProduct, deleteProduct, postLineItem, postOrder, fetchCartItems, addCartItem }

export default connect(mapState, mapDispatch)(SingleProduct)
