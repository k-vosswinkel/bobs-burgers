import React, {Component} from 'react'
import {deleteProduct} from '../store/allProducts'
import {fetchCurrentProduct} from '../store/currentProduct'
import NewProduct from './NewProduct';
// import Reviews from './Reviews';
import {connect} from 'react-redux';

class SingleProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentProduct: this.props.currentProduct,
      isEditing: false
    }
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
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

  render() {
    const currentUser = this.state.currentUser
    const currentProduct = this.state.currentProduct;
    const reviews = currentProduct.reviews || []
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
            {/* only admins can see inventory, edit, or delete: */}
            {/* {currentUser.isAdmin && <div className="page-body">} */}
              <p> Current Inventory: {currentProduct.inventory} </p>
              <button onClick={this.handleEdit} className="btn btn-warning new">Edit Product </button>
              <button onClick={this.handleDelete} className="btn btn-danger new">Delete Product</button>
          </div>
        </div>

          <div className="page-body">
              <button className="btn btn-submit new">Add To Cart</button>
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

          <div>
              <h5>Average Rating</h5>
              {currentProduct.reviews && currentProduct.reviews.length
               ? <p>Average Rating: {currentProduct.reviews.reduce((acc, currVal) => acc + currVal.rating, 0) / currentProduct.reviews.length}</p>
               : <p> No ratings </p>
              }
               <h5>All Ratings </h5>
                {/* <Reviews reviews={reviews} /> */}
          </div>
      </div>

      )
    }
  }
}

const mapState = ({currentProduct, currentUser}) => {
  return {currentProduct, currentUser}
}

const mapDispatch = {fetchCurrentProduct, deleteProduct}

export default connect(mapState, mapDispatch)(SingleProduct)

