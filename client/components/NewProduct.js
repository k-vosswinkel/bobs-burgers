import React, {Component} from 'react';
import {connect} from 'react-redux';
import {postProduct, editProduct} from '../store';

class NewProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.product ? this.props.product.id : '',
      name: this.props.product ?
      this.props.product.name : '',
      url: this.props.product ? this.props.product.url : '',
      description: this.props.product ? this.props.product.description : '',
      price: this.props.product ? this.props.product.price : '',
      inventory: this.props.product ? this.props.product.inventory : '',
      dirty: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [ event.target.name]: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault();
    const {id, name, url, description, price, inventory} = this.state;
    const submittedProduct = {id, name, url, description, price, inventory}

    if (this.props.product) {
      this.props.editProduct(submittedProduct)
      this.props.handleEdit()
    } else {
      this.props.postProduct(submittedProduct)
    }

    this.setState({
      id: '',
      name: '',
      url: '',
      description: '',
      price: '',
      dirty: false
    })
  }

  render() {
    let completed = this.state.name && this.state.description && this.state.price;
    let disabled = !completed

    return (
      <div>
        <div>
        {disabled &&
          <div className="alert alert-warning">You must enter a product name, description, and price.</div>
          }
        </div>
        <form onSubmit={this.handleSubmit()}>
          <label>Name:
            <input
              name="name"
              onChange={this.handleChange()}
              value={this.state.name}
            />
          </label>
          <label>URL:
            <input
              name="url"
              type="url"
              onChange={this.handleChange()}
              value={this.state.url}
            />
          </label>
          <label>Description:
            <input
              name="description"
              onChange={this.handleChange()}
              value={this.state.description}
            />
          </label>
          <label>Price:
            <input
              name="price"
              onChange={this.handleChange()}
              value={this.state.price}
            />
          </label>
          <label>Inventory:
            <input
              name="inventory"
              onChange={this.handleChange()}
              value={this.state.inventory}
            />
          </label>
        </form>
      </div>
    )
  }

}

const mapDispatch = {postProduct, editProduct}
export default connect(null, mapDispatch)(NewProduct)

