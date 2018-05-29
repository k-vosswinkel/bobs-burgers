import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'
import { GuestCart, UserCart } from './index'

const Navbar = ({ handleClick, isLoggedIn, isAdmin }) => (
  <div>
    <nav>
        <div className="nav-logo">
          <Link to="/">The Burger Emporium</Link>
        </div>

        {/* <div className="all-nav"> */}
        {/* <div className="nav-items"> */}
        <div className="nav-items">
        <Link to="/categories">All Burgers</Link>
        {isLoggedIn ? (
          <div>
            <Link to="/account">My Account</Link>
          {/* The navbar will show these links after you log in */}
          {/* <Link to="/home">Home</Link> */}
          <a href="#" onClick={handleClick}>
            Logout
          </a>
          {/* <Link to="/categories">All Burgers</Link> */}
          {/* <UserCart /> */}
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          {/* <Link to="/categories">All Burgers</Link> */}
          {/* <GuestCart /> */}
        </div>
        ) }

      {isAdmin ? (
        <div className="nav-items">
          <Link to="/orders">All Orders</Link>
          <Link to="/users">All Users</Link>
        </div>
       ) : null }
       {/* </div> */}
       { isLoggedIn ? <UserCart /> : <GuestCart /> }
       </div>
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
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
