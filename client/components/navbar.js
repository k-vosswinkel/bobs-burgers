import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Cart} from './index'

const Navbar = ({ handleClick, isLoggedIn, isAdmin }) => (
  <div>
    <h2>Bob's Burgers Emporium</h2>
    <nav>
      <div>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
          {isAdmin ? (
            <div>

            </div>
          ) : ''
          }
          <Link to="/categories">Product Catalog</Link>
          <Cart />
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/categories">Product Catalog</Link>
          <Cart />
        </div>
        ) }
      </div>
      <div>
      {isAdmin ? (
        <div>
          <Link to="/orders">All Orders</Link>
          <Link to="/users">All Users</Link>
        </div>
       ) : null }
      </div>
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    //Use '!!' with currentUser to coerce id into a truthy/falsey value; since Admin is already a boolean
    //we don't need the double bang! :D
    isLoggedIn: !!state.currentUser.id,
    isAdmin: state.currentUser.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
