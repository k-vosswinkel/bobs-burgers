import React, {Component} from 'react';
import {connect} from 'react-redux';
import {postProduct, editProduct} from '../store/allProducts';


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
      categories: this.props.product ? this.props.product.categoryIds : ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [ event.target.name]: event.target.value})
    console.log(this.state, 'this.state')
  }

  handleSelectChange(event) {
    console.log(this.state, 'this.state')
    this.setState({
      categories: [].slice.call(event.target.selectedOptions).map(o => {
          return o.value;
      })
    })
  }

  handleSubmit(event) {
    event.preventDefault();

    const {id, name, url, description, price, inventory, categories} = this.state;
    const submittedProduct = {id, name, url, description, price, inventory, categories}

    if (this.state.id) {
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
      categories: []
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

        <form className="section-body" onSubmit={this.handleSubmit}>
          <label>Name:
            <input
              name="name"
              onChange={this.handleChange}
              value={this.state.name}
            />
          </label>
          <label>URL:
            <input
              name="url"
              onChange={this.handleChange}
              value={this.state.url}
            />
          </label>
          <label>Description:
            <input
              name="description"
              onChange={this.handleChange}
              value={this.state.description}
            />
          </label>
          <label>Price:
            <input
              name="price"
              onChange={this.handleChange}
              value={this.state.price}
              type="number"
              step="0.01"
              min="0"
            />
          </label>
          <label>Inventory:
            <input
              name="inventory"
              onChange={this.handleChange}
              type="number"
              min="0"
              value={this.state.inventory}
            />
          </label>
          <label>Categories:
            <select
            multiple={true}
            onChange={this.handleSelectChange}> <option disabled selected value> -- select one or more option(s) -- </option>
            {this.props.allCategories.map(category => {
              return (
                <option key={category.id} value={category.id}>
                {category.name}</option>
              )
            })}
            </select>
          </label>
          <button className="btn btn-success" disabled={disabled}type="submit">Submit</button>
        </form>
      </div>
    )
  }

}

const mapState = ({allCategories}) => ({allCategories})
const mapDispatch = {postProduct, editProduct}
export default connect(mapState, mapDispatch)(NewProduct)
