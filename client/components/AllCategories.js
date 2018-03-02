import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchCategories} from '../store/allCategories'
import {Link} from 'react-router-dom'

class AllCategories extends Component {

  componentDidMount() {
    this.props.fetchCategories();
  }

  render() {
    const {allCategories} = this.props;
    return (

    )
  }
}
