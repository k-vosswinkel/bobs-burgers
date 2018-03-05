import React, {Component} from 'react';

export default class NewReview extends Component {
  constructor(props) {
    super();

  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    const {rating, text} = evt.target;
    let review = {
      text: text.value,
      rating: rating.value,
      userId: this.props.user.id,
      productId: this.props.product.id
    }
    this.props.submitReview(review);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <select name="rating" >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            </select>
          <input type="text" name="text" />
          <input type="submit" />
        </form>
      </div>
    )
  }
}
