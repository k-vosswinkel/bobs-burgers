import React, {Component} from 'react';
import {connect} from 'react-redux';
import {postReview, deleteReview, fetchReviews} from '../store/allReviews';
import {fetchCurrentProduct} from '../store/singleProduct';
import NewReview from './NewReview';

class Reviews extends Component {

  handleClick = () => {
    this.props.postReview({text: 'hey', rating: 4, productId: 1});
  }

  submitReview = (review) => {
    this.props.postReview(review);
  }

  handleRemove = (review) => { this.props.deleteReview(review) }

  render() {
    const {currentProduct, currentUser} = this.props;
    if (!currentProduct.reviews) {return null}
    else {
      return (
      <div id="reviews-section">
        {currentUser ? <NewReview submitReview={this.submitReview} product={currentProduct} user={currentUser} /> : null}
        <h5>Average Rating</h5>
          {currentProduct.reviews && currentProduct.reviews.length
            ? <p>Average Rating: {Math.round((currentProduct.reviews.reduce((acc, currVal) => acc + currVal.rating, 0) / currentProduct.reviews.length) * 10) / 10}</p>
            : <p> No ratings </p>
          }
          <h5>All Ratings </h5>
        {
          currentProduct.reviews.length
          ? currentProduct.reviews.map(review => {
          return (
            <ul className="reviews-list-item" key={review.id}>
              <p>Rating: {review.rating}</p>
              <p>Comments: {review.text}</p>
            {currentUser.isAdmin && <button onClick={() => this.handleRemove(review)}>-</button>}
            </ul>)
            })
          : <p>There are no reviews for this product</p>
          }
      </div>
    )
    }
  }
}

const mapState = ({currentProduct, allReviews, currentReview, currentUser}) => ({ currentProduct, allReviews, currentReview, currentUser })

const mapDispatch = {fetchCurrentProduct, fetchReviews, postReview, deleteReview};

export default connect(mapState, mapDispatch)(Reviews);
