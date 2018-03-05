import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCurrentOrder } from '../store/currentOrder'

class SingleOrder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentOrder: {}
    }
  }

  componentDidMount() {
    console.log(this.props.match.params.orderId)
    this.props.fetchCurrentOrder(this.props.match.params.orderId);
  }

  render() {
    const { currentOrder } = this.props;
    console.log('display line items up top: ', currentOrder.lineItems);
    if (!currentOrder) {
      return <div>No Order Selected</div>
    } else {
      let lineItems = this.props.currentOrder.lineItems;
      if (!lineItems){
        return <div>There are no line items to display</div>
      } else {
        return (
          <div key={currentOrder.id} className="lineItem">
            <div>order id: {currentOrder.id}</div>
            <div>order status: {currentOrder.status}</div>
            <div>email address: {currentOrder.email}</div>
            {lineItems.map(lineItem => {
                return (
                  <div key={lineItem.id}>
                    <div>name: {lineItem.product.name}</div>
                    <div>quantity: {lineItem.quantity}</div>
                    <div>price: {lineItem.product.price}</div>
                  </div>
                )
              })
            }
          </div>
        )
      }
    }
  }
}

// Container
const mapState = ({ allOrders, currentOrder }) => ({ allOrders, currentOrder })
const mapDispatch = { fetchCurrentOrder }

export default connect(mapState, mapDispatch)(SingleOrder);
