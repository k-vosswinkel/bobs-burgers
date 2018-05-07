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
      <div>
        <div>
        <h2> Admin Users </h2>
        {!this.props.adminUsers.length
          ? <div>No admin users to see here!</div>
          : <div>
            {this.props.adminUsers.map(user => {
              return (
                <Link key={user.id} to={`/users/${user.id}`}>
                  <div className="user product">
                    <div>{user.email}</div>
                    <button className="btn btn-success">Edit User</button>
                  </div>
                </Link>
              )
            })}
            </div>
          }
          </div>
          <div>
          <h2> Non-Admin Users </h2>
          {!this.props.nonAdminUsers.length
              ? <div>No non-admin users to see here!</div>
              : <div>
                  {this.props.nonAdminUsers.map(user => {
                    return (
                      <Link key={user.id} to={`/users/${user.id}`}>
                        <div className="user product">
                          <div>{user.email}</div>
                          <button className="btn btn-success">Edit User</button>
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
