import React from 'react';
import { Link } from 'react-router-dom';

const TransparentButton = ({route, text}) => {
  return (
    <div className="transparent-button">
      <Link to={`${route}`}>{text}</Link>
    </div>
  )
}

export default TransparentButton;
