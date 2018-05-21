import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUsers } from '../store/allUsers'

class AllUsers extends Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  render() {
    return (
      <div className="user-display">
        <div>
          <div className="section-header">
            <div className="title-box"><h2>Admin</h2></div>
          </div>
          {!this.props.adminUsers.length
            ? <div>No admin users to see here!</div>
            : <div>
              {this.props.adminUsers.map(user => {
                return (
                  <Link key={user.id} to={`/users/${user.id}`}>
                    <div className="user-list">
                      <div className="user-details col-xs-2">{user.email}</div>
                      <button className="btn btn-success user-details">Edit User</button>
                    </div>
                  </Link>
                )
              })}
              </div>
            }
          </div>
          <div>
            <div className="section-header">
              <div className="title-box"><h2>Users</h2></div>
            </div>
            {!this.props.nonAdminUsers.length
              ? <div>No non-admin users to see here!</div>
              : <div>
                  {this.props.nonAdminUsers.map(user => {
                    return (
                      <Link key={user.id} to={`/users/${user.id}`}>
                        <div className="user-list">
                          <div className="user-details col-xs-2">{user.email}</div>
                          <button className="btn btn-success user-details">Edit User</button>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              }
          </div>
        </div>
      )
    }
}

// Container
const mapState = ({ allUsers, currentUser }) => {
  const adminUsers = allUsers.filter(users => users.isAdmin === true)
  const nonAdminUsers = allUsers.filter(users => users.isAdmin === false)

  return ({
    currentUser,
    adminUsers,
    nonAdminUsers
  })
}
const mapDispatch = { fetchUsers }

export default connect(mapState, mapDispatch)(AllUsers);
