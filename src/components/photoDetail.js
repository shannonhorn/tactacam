import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

const PhotoDetail = () => {
  const location = useLocation();
  const photo = location.state.photo;
  return (
    <>
      <Link to='/' className='back-link'>
        &lt;&nbsp;Back
      </Link>
      <div className='photo-detail'>
        <img alt={photo.alt_description} src={photo.urls.full} />
        <div className='photo-meta'>
          <div>
            <span>Username</span>
            {photo.user.name}
          </div>
          <div>
            <span>Description</span>
            {photo.description}
          </div>
          <div>
            <span>Created</span>
            {photo.created_at}
          </div>
          <div>
            <span>Likes</span>
            {photo.likes}
          </div>
        </div>
      </div>
    </>
  );
};

export default PhotoDetail;
