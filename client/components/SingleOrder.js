import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCurrentOrder, editOrder } from '../store'

class SingleOrder extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchCurrentOrder(this.props.match.params.orderId);
  }

  handleSubmit = (event) => {
    console.log('working')
    event.preventDefault();
    let status = event.target.status.value;
    let user = {
      id: this.props.currentOrder.id,
      status: status
    }
    this.props.editOrder(user);
  }

  render() {
    const { currentOrder } = this.props;
    if (!currentOrder) {
      return <div>Order loading...</div>
    } else {
      let lineItems = this.props.currentOrder.lineItems;
      if (!lineItems){
        return (
        <div key={currentOrder.id} className="singleOrderContainer">
          <div>
            <form className="section-body" onSubmit={this.handleSubmit}>
              <label>Status:
              <select name="status">
                <option value="Pending">Pending</option>
                <option value="Created">Created</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Completed">Completed</option>
              </select>
              </label>
              <button className="btn btn-success" type="submit">Update</button>
            </form>
          </div>
          <div>email address: {currentOrder.email}</div>
          {/* <div>order status: {currentOrder.status}</div> */}
        <div>Line items loading...</div>
        </div>
        )
      } else {
        let orderTotal = 0;
        return (
          <div key={currentOrder.id} className="singleOrderContainer">
            <div>
              <form className="section-body" onSubmit={this.handleSubmit}>
                <label>Status:
              <select name="status">
                    <option value="Pending">Pending</option>
                    <option value="Created">Created</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Completed">Completed</option>
                  </select>
                </label>
                <button className="btn btn-success" type="submit">Update</button>
              </form>
            </div>
            <div>email address: {currentOrder.email}</div>
            {/* <div>order status: {currentOrder.status}</div> */}
            <div><p>Date placed: {currentOrder.orderDate.slice(0, 10)}</p></div>
            {lineItems.map(lineItem => {
                orderTotal = orderTotal + lineItem.totalPrice;
                return (
                  <div key={lineItem.id} className="lineItem">
                    <div>name: {lineItem.product.name}</div>
                    <div>quantity: {lineItem.quantity}</div>
                    <div>price: {lineItem.currentPrice}</div>
                    <div>Item total: {lineItem.totalPrice}</div>
                  </div>
                )
              })
            }
            <div>Order total: {orderTotal}</div>
          </div>
        )
      }
    }
  }
}

// Container
const mapState = ({ allOrders, currentOrder }) => ({ allOrders, currentOrder })
const mapDispatch = { fetchCurrentOrder, editOrder }

export default connect(mapState, mapDispatch)(SingleOrder);
