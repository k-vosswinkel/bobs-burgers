import { Link } from 'react-router-dom';
import React from 'react';

const TransparentButton = ({route, text}) => {
  return (
    <div className="transparent-button">
      <Link to={`${route}`}>{text}</Link>
    </div>
  )
}

export default TransparentButton;
