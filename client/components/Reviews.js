import React, {Component} from 'react';
import {connect} from 'react-redux';
import {postReview, deleteReview, fetchReviews} from '../store/allReviews';
import {fetchCurrentProduct} from '../store/singleProduct';

class Reviews extends Component {
  componentDidMount() {
    this.props.fetchCurrentProduct(1);
  }

  handleClick = () => {
    this.props.postReview({text: 'hey', rating: 4, productId: 1});
  }

  handleAdd

  handleRemove = (review) => { this.props.deleteReview(review) }

  render() {
    const {singleProduct} = this.props;
    if (!singleProduct.reviews) {return null}
    else {
      return (
      <div>
        <button onClick={this.handleClick}>Test Add!</button>

        {
          singleProduct.reviews.length ? singleProduct.reviews.map(review => <h1 key={review.id}>{review.text}<button onClick={() => this.handleRemove(review)}>-</button></h1>) : <p>There are no reviews for this product</p>
        }
      </div>
    )
    }
  }
}

const mapState = ({singleProduct, allReviews, currentReview}) => ({ singleProduct, allReviews, currentReview })

const mapDispatch = {fetchCurrentProduct, fetchReviews, postReview, deleteReview};

export default connect(mapState, mapDispatch)(Reviews);
