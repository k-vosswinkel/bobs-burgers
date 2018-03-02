import React from 'react';

const SingleItem = ({name, imgUrl}) =>
  (
    <div>
      <p>{name}</p>
      <img src={imgUrl} />
    </div>
  )


export default SingleItem;
