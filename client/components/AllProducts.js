import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchProducts} from '../store/allProducts';
import {fetchCategories} from '../store/allCategories';
import {fetchCurrentCategory} from '../store/currentCategory';
import { Link } from 'react-router-dom';

// Component
class AllProducts extends Component {

  componentDidMount() {
    this.props.fetchData()
  }

  render() {
    const displayProducts = this.props.categoryProducts
    ? this.props.categoryProducts
    : this.props.allProducts

    return (
      <div id="products-list">
        <div className="section-header">
          {this.props.categoryProducts
          ? <h4>Products in this Category ({displayProducts.length} products)</h4>
          : <h2> All Products ({displayProducts.length} products)</h2>
          }
        </div>

        <div>
        {(displayProducts && displayProducts.length === 0)
        ? <h5>There are no products at this time. </h5>
        : <div className="container">
          {displayProducts && displayProducts.map(product => {
            return (
                <div className="list-item" key={product.id}>
                <Link to={`/products/${product.id}`}>
                  <img className="thumbnail" src={ product.imgUrl } />
                  <div>
                    <h4>{product.name}</h4>
                    {this.props.currentUser.isAdmin && <div className="page-body">
                        <p> Current Inventory: {product.inventory} </p>
                      </div>}
                    <p>Price: {product.price}</p>
                    {product.reviews && product.reviews.length
                    ? <p>Average Rating: {Math.round((product.reviews.reduce((acc, currVal) => acc + currVal.rating, 0) / product.reviews.length) * 10) / 10}</p>
                    : <p> No ratings </p>
                  }
                  </div>
                  </Link>
                </div>
              )
            })
          }
        </div>
        }
     </div>
    </div>
  )
  }
}


// Container
const mapState  = ({allProducts, currentUser, allCategories}, ownProps) => {
  return {
    categoryProducts: ownProps.products,
    allProducts,
    currentUser,
    allCategories
  }
}

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
