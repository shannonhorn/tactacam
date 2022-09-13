import React, { useState, useEffect, useRef, useCallback } from 'react';
import usePhotoSearch from '../usePhotoSearch';
import PhotoSearchResult from './photoSearchResult';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [filterColor, setFilterColor] = useState();
  const [filterOrientation, setFilterOrientation] = useState();
  const searchInput = useRef(null);
  const observer = useRef();
  const { photos, loading, hasMore } = usePhotoSearch(
    searchTerm,
    pageNumber,
    filterColor,
    filterOrientation
  );
  const lastPhotoElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  function handleSearch(e) {
    e.preventDefault();
    setSearchTerm(searchInput.current.value);
    setPageNumber(1);
  }

  useEffect(() => {
    searchInput.current.focus();
  }, []);
  return (
    <div className='Home'>
      <h1>Search the Unsplash API</h1>
      <input
        type='text'
        placeholder='Search for photos'
        value={searchTerm}
        onChange={handleSearch}
        ref={searchInput}
      />
      <div className='filters'>
        <select
          value={filterColor}
          onChange={(event) => setFilterColor(event.target.value)}
        >
          <option value=''>Filter by color</option>
          <option value='black_and_white'>Black and white</option>
          <option value='black'>Black</option>
          <option value='white'>White</option>
          <option value='yellow'>Yellow</option>
          <option value='orange'>Orange</option>
          <option value='red'>Red</option>
          <option value='purple'>Purple</option>
          <option value='magenta'>Magenta</option>
          <option value='green'>Green</option>
          <option value='teal'>Teal</option>
          <option value='blue'>Blue</option>
        </select>
        <select
          value={filterOrientation}
          onChange={(event) => setFilterOrientation(event.target.value)}
        >
          <option value=''>Filter by orientation</option>
          <option value='landscape'>Landscape</option>
          <option value='portrait'>Portrait</option>
          <option value='squarish'>Squarish</option>
        </select>
      </div>
      <div className='photos-container'>
        {photos.length === 0 && <div>No photos to display yet!</div>}
        {photos.map((photo, index) => {
          if (photos.length === index + 1) {
            return (
              <div ref={lastPhotoElementRef} key={photo.id}>
                <PhotoSearchResult photo={photo} />
              </div>
            );
          } else {
            return <PhotoSearchResult key={photo.id} photo={photo} />;
          }
        })}
        <div>{loading && 'loading...'}</div>
      </div>
    </div>
  );
};

export default Home;
