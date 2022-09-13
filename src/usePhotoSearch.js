import { useState, useEffect } from 'react';

export default function usePhotoSearch(
  searchTerm,
  pageNumber,
  filterColor,
  filterOrientation
) {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  useEffect(() => {
    setPhotos([]);
  }, [searchTerm]);
  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await (
          await fetch(
            `${
              process.env.REACT_APP_UNSPLASH_ENDPOINT
            }?page=${pageNumber}&query=${searchTerm}&client_id=${
              process.env.REACT_APP_UNSPLASH_CLIENT_ID
            }${filterColor ? `&color=${filterColor}` : ''}${
              filterOrientation ? `&orientation=${filterOrientation}` : ''
            }`,
            { signal: abortController.signal }
          )
        ).json();
        let results = [
          ...new Map(
            data.results.map((photo) => [photo['id'], photo])
          ).values(),
        ];
        setPhotos((prevPhotos) => {
          return [...prevPhotos, ...results];
        });
        setLoading(false);
        setHasMore(data.results.length > 0);
      } catch (error) {
        // do something more here with the error
        return;
      }
      setLoading(false);
    };

    fetchData();
    return () => abortController.abort();
  }, [searchTerm, pageNumber, filterColor, filterOrientation]);
  return { photos, loading, hasMore };
}
