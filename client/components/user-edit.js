import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchUserToEdit } from '../store'

class EditUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {}
    }
  }

  componentDidMount() {
    this.props.fetchUserToEdit(this.props.match.params.userId);
  }

  render() {
    let currentUser = this.props.currentUser;
    if (!currentUser) {
      return <div>No User Selected</div>
    } else {
      return (
        <div key={currentUser.id}>
          <div>email: {currentUser.email}</div>
        </div>
      )
    }
  }
}

// Container
const mapState = ({ allUsers, currentUser }) => ({ allUsers, currentUser })
const mapDispatch = { fetchUserToEdit }

export default connect(mapState, mapDispatch)(EditUser);

// Prop Types
// AllOrders.propTypes = {
//   allOrders: PropTypes.array
// }
