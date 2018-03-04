import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchCategories} from '../store/allCategories'
import { Link } from 'react-router-dom';

class AllCategories extends Component {

    constructor(props) {
      super(props);
    }

  render() {

    return (
      <div>
      <Link className="btn btn-primary new" to="/new-category"> <span className="glyphicon glyphicon-plus">New Category </span></Link>
      {this.props.allCategories.map(category => {
        return (
            <div key={category.id}>
                <h4>{category.name}</h4>
                <p><Link to="/new-category">Edit</Link></p>
            </div>
        )
      })
     }
    </div>
    )
  }
}

const mapState = ({allCategories}) => ({allCategories})


const mapDispatch = dispatch => {
  return {
  fetchData: () => {
    dispatch(fetchCategories());
    }
  }
}

export default connect(mapState, mapDispatch)(AllCategories)
