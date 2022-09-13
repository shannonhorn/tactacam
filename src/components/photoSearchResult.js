import React from 'react';
import { Link } from 'react-router-dom';

const PhotoSearchResult = ({ photo }) => {
  return (
    <Link to={`/detail/${photo.id}`} state={{ photo }} className='photo-link'>
      <img key={photo.id} alt={photo.alt_description} src={photo.urls.thumb} />
    </Link>
  );
};

export default PhotoSearchResult;
