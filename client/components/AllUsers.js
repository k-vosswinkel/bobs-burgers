import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUsers } from '../store/allUsers'

class AllUsers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentOrder: ''
    }
  }

  componentDidMount() {
    this.props.fetchUsers();
  }

  render() {
    if (!this.props.allUsers.length) {
      return (
        <div>No Users to See Here!</div>
      )
    } else {
      let allUsers = this.props.allUsers;
      return (
        <div>
          {allUsers.map(user => {
            return (
              <Link key={user.id} to={`/users/${user.id}`}>
                <div>{user.email}</div>
                <div>{user.admin}</div>
              </Link>
            )
          })}
        </div>
      )
    }
  }
}

// Container
const mapState = ({ allUsers, currentUser }) => ({ allUsers, currentUser })
const mapDispatch = { fetchUsers }

export default connect(mapState, mapDispatch)(AllUsers);

