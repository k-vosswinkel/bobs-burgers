import React, {Component} from 'react'
import {deleteProduct} from '../store/allProducts'
import {fetchCurrentProduct} from '../store/singleProduct'
import NewProduct from './NewProduct';
// import AllReviews from './AllReviews';
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
    fetchCurrentProduct(this.props.match.productId)
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
    const reviews = currentProduct.reviews;

    if (!currentProduct) return <div />; // the product id is invalid or the data isnt loaded yet

    if (this.state.isEditing) {
      return (
        <NewProduct product={this.state.product} handleEdit={this.handleEdit} />
      )
    }

     else {
      return (

        <div>
          <div className="page-header">
            <h2>{currentProduct.name}</h2>
            {/* only admins can see inventory, edit, or delete: */}
            {currentUser.isAdmin && <div className="page-body">
              <p> Current Inventory: {currentProduct.inventory} </p>
              <button onClick={this.handleEdit} className="btn btn-warning new">Edit Product </button>
              <button onClick={this.handleDelete} className="btn btn-danger new" >Delete Product</button>
            </div>}
          </div>

          <div className="page-body">
              <img src={ currentProduct.imageUrl } />
              <button className="btn btn-submit new">Add To Cart</button>
              <p>Price: {currentProduct.price} </p>
              <p>Description: {currentProduct.description} </p>
          </div>

          <div>
            <AllReviews reviews={reviews} />
          </div>

      </div>
      )
    }
  }
}

const mapStateToProps = ({currentProduct, currentUser}) => {
  const productReviews = currentProduct.reviews.filter(review => review.productId === currentProduct.id)
  return {currentProduct, currentUser, productReviews}
}

const mapDispatchToProps = {deleteProduct, fetchCurrentProduct}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)

