import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchUserToEdit } from '../store'

class EditUser extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchUserToEdit(this.props.match.params.userId);
  }

  // handleChange(event) {

  // }

  handleSubmit(event) {
    event.preventDefault();

  }

  //FORM UNDER CONSTRUCTION
  render() {
    let currentUser = this.props.currentUser;

    if (!currentUser) {
      return <div>No User Selected</div>
    } else {
      return (
        <div>
          <form className="section-body" onSubmit={this.handleSubmit}>
            <label>Email:
            <input
                name="email"
                // onChange={this.handleChange}
                value={this.props.currentUser.email}
              />
            </label>
            <button className="btn btn-success" type="submit">Update</button>
          </form>
        </div>
      )
    }
  }
}

// Container
const mapState = ({ allUsers, currentUser }) => ({ allUsers, currentUser })
const mapDispatch = { fetchUserToEdit }

export default connect(mapState, mapDispatch)(EditUser);
