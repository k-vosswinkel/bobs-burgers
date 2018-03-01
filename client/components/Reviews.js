import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchReviews} from '../store/allReviews';
import {postReview, deleteReview} from '../store/currentReview';

class Reviews extends Component {
  constructor(props) {
    super();

    this.handleClick = this.handleClick.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

componentDidMount() {
  this.props.getReviews();
}

handleClick() {
  this.props.addReview();
}

handleRemove() {
  this.props.removeReview(this.props.currentReview);
}

  render() {
    console.log(this.props.reviews);
    return (
      <div>
        <button onClick={this.handleClick}>Test Add!</button>
        <button onClick={this.handleRemove}>Test Remove!</button>
        {
          this.props.reviews.length ? this.props.reviews.map(review => <h1 key={review.id}>{review.text}</h1>) : null
        }
      </div>
    )
  }
}

const mapState = (state) => ({
  reviews: state.allReviews,
  currentReview: state.currentReview
})
const mapDispatch = (dispatch) => ({
  getReviews: () => {
    dispatch(fetchReviews());
  },
  addReview: () => {
    dispatch(postReview({ text: 'hey', rating: 4}))
  },
  removeReview: (review) => {
    dispatch(deleteReview(review))
  }
})

export default connect(mapState, mapDispatch)(Reviews);
