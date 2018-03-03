import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {fetchProducts} from '../store/allProducts';
import {fetchCategories} from '../store/allCategories';
import { Link } from 'react-router-dom';

// Component
class AllProducts extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentCategory: ''
    }
    this.handleChange = this.handleChange.bind(this.handleChange)
  }


  componentDidMount() {
    this.props.fetchProducts();
    this.props.fetchCategories();
  }

  handleChange(event) {
    this.setState({currentCategory: event.target.value});
  }

  render() {
    const allProducts = this.state.currentCategory
    ? this.props.allProducts.filter(product => product.categoryId === this.state.currentCategory.id)
    : this.props.allProducts
    const {allCategories, currentUser} = this.props;


    return (
    <div>
      <div className="page-header">
        <h2>All Products </h2>
        {currentUser.isAdmin && <div>
        <Link className="btn btn-primary new" to="/new-product"> <span className="glyphicon glyphicon-plus"></span>New Product</Link>
        <Link className="btn btn-primary new" to="/categories"> <span className="glyphicon glyphicon-plus"></span>All Categories</Link>
        </div>}
      </div>

      <div>
        <select>
          <h3>Select a Category</h3>
          {allCategories.map(category => {
            return (
              <option key={category.id} value={category.id}>{category.name}</option>
            )
          })}
          </select>
      </div>

      <div className="container">
        {allProducts.map(product => {
          return (
              <Link to={`/products/${product.id}`} key={product.id}>
              <div>
                <img className="thumbnail" src={ product.imgUrl } />
                <div>
                  <h4>{product.name}</h4>
                  {currentUser.isAdmin && <div className="page-body">
                      <p> Current Inventory: {product.inventory} </p>
                    </div>}
                  <h3>Price: {product.price}</h3>
                  {product.ratings.length
                  ? <h3>Average Rating: {product.ratings.reduce((acc, currVal) => acc + currVal.rating, 0) / product.ratings.length}</h3>
                  : <h3> No ratings </h3>
                  }
                </div>
              </div>
              </Link>
            )
          })
        }
      </div>
    </div>
      )
    }
}


// Container
const mapState  = ({allProducts, currentUser}) => ({allProducts, currentUser})
const mapDispatch = {fetchProducts, fetchCategories}

export default connect(mapState)(mapDispatch)(AllProducts)

// Prop Types
AllProducts.propTypes = {
  allProducts: PropTypes.array
}
