import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchPlaylists } from '../redux/playlistsSlice'; // Import the action from your slice
import SpotifyPlaylistButton from './SpotifyPlaylistButton';

const PlaylistScroll = () => {
  const dispatch = useDispatch();
  const { playlists, status, error, hasMore, offset, limit, nextPageToken } = useSelector(state => state.playlists);
  
  const [loading, setLoading] = useState(false);

  // UseRef to prevent re-triggering due to React StrictMode
  const hasFetched = useRef(false);

  useEffect(() => {
    if (status === 'idle' && !hasFetched.current) {
      hasFetched.current = true; // Set ref to true to prevent future effects
      setLoading(true); // Mark loading as true when fetching
      dispatch(fetchPlaylists({ offset, limit, nextPageToken }));
    }
  }, [status, offset, limit, nextPageToken, dispatch]);

  const fetchData = () => {
    if (hasMore && status !== 'loading' && !loading) {
      setLoading(true);
      dispatch(fetchPlaylists({ offset, limit, nextPageToken }));
    }
  };

  useEffect(() => {
    if (status === 'succeeded' || status === 'failed') {
      setLoading(false); // Reset loading state once fetching is complete
    }
  }, [status]);

  return (
    <div>
      <h1>Your Spotify Playlists</h1>
      <InfiniteScroll
        dataLength={playlists.length}
        next={fetchData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p style={{ textAlign: 'center' }}><b>Yay! You have seen it all!</b></p>}
      >
        {playlists.map((playlist, index) => (
          <div key={index}>
            <SpotifyPlaylistButton playlist={playlist}/>
          </div>
        ))}
      </InfiniteScroll>
      {status === 'failed' && <div>Error: {error}</div>}
    </div>
  );
};

export default PlaylistScroll;
