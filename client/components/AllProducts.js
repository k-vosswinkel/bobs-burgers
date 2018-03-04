import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchProducts} from '../store/allProducts';
import {fetchCategories} from '../store/allCategories';
import {fetchCurrentCategory} from '../store/currentCategory';
import { Link } from 'react-router-dom';

// Component
class AllProducts extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentCategory: this.props.currentCategory,
      selectedCategory: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchData();
  }

  componentWillReceiveProps(newProps, oldProps) {
    if (newProps.currentCategory !== oldProps.currentCategory) {
      this.setState({
        currentCategory: newProps.currentCategory
      })
    }
  }

  handleChange(event) {
    this.setState({selectedCategory: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault();
    const categoryId = Number(this.state.selectedCategory)
    // redirect to categories/categoryId
    if (event.target.value !== "All") {
      this.props.fetchCurrentCategory(categoryId)
    }
  }

  render() {

    let displayProducts = this.props.currentCategory
    ? this.props.currentCategory.products
    : this.props.allProducts
    const {allCategories, currentUser} = this.props;

    return (
    <div>
      <div className="page-header">
        <h2>All Products </h2>
        {/* {currentUser.isAdmin && <div> */}
        <Link className="btn btn-primary new" to="/new-product"> <span className="glyphicon glyphicon-plus">New Product</span></Link>
        <Link className="btn btn-primary" to="/categories"> <span className="glyphicon">All Categories</span></Link>
        {/* </div>} */}
      </div>

      <div>
        <h5>Select a category to view related products</h5>
        <form onSubmit={this.handleSubmit}>
          <select onChange={this.handleChange} value={this.state.selectedCategory}>
          <option disabled selected value> -- select a category -- </option>
            {allCategories.map(category => {
              return (
                <option key={category.id} value={category.id}>{category.name}</option>
              )
            })}
            </select>
            <button className="btn btn-success" type="submit">Go!</button>
          </form>
      </div>

      {(displayProducts.length === 0) ?
      <h1>There are no products </h1>
      : <div className="container">
        {displayProducts && displayProducts.map(product => {
          return (
              <Link to={`/products/${product.id}`} key={product.id}>
              <div className="list-group-item-products">
                <img className="thumbnail" src={ product.imgUrl } />
                <div>
                  <h4>{product.name}</h4>
                  {currentUser.isAdmin && <div className="page-body">
                      <p> Current Inventory: {product.inventory} </p>
                    </div>}
                  <p>Price: {product.price}</p>
                  {product.reviews && product.reviews.length
                  ? <p>Average Rating: {product.reviews.reduce((acc, currVal) => acc + currVal.rating, 0) / product.reviews.length}</p>
                  : <p> No ratings </p>
                 }
                </div>
              </div>
              </Link>
            )
          })
        }
      </div>
      }
    </div>
  )
  }
}


// Container
const mapState  = ({allProducts, currentUser, allCategories}) => ({allProducts, currentUser, allCategories})

const mapDispatch = dispatch => {
  return {
  fetchData: () => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
    },
  fetchCurrentCategory: (id) => {
    dispatch(fetchCurrentCategory(id))
    }
  }
}

export default connect(mapState, mapDispatch)(AllProducts)

