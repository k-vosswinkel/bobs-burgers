import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchCategories} from '../store/allCategories'
import { Link } from 'react-router-dom';

class SingleCategories extends Component {

    constructor(props) {
      super(props);
    }
