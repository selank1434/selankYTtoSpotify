import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchYoutubePlaylists } from '../redux/youtubePlaylistsSlice';
import YoutubePlaylistButton from './YoutubePlaylistButton';
import ConvertModal from './ConvertModal'; 
import { resetPlaylist } from '../redux/youtubePlaylistDataSlice'; 


const YtPlaylistScroll = ({ scrollableTarget }) => {
  const dispatch = useDispatch();
  const { playlists, status, error, hasMore, offset, limit, nextPageToken } = useSelector(state => state.ytPlaylists);

  const [loading, setLoading] = useState(false);
  const [selectedButtonId, setSelectedButtonId] = useState(null);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null); // Store the selected playlist ID
  const hasFetched = useRef(false);

  useEffect(() => {
    if (status === 'idle' && !hasFetched.current) {
      hasFetched.current = true;
      setLoading(true);
      dispatch(fetchYoutubePlaylists({ offset, limit, nextPageToken }));
    }
  }, [status, offset, limit, nextPageToken, dispatch]);

  const fetchData = () => {
    if (hasMore && status !== 'loading' && !loading) {
      setLoading(true);
      dispatch(fetchYoutubePlaylists({ offset, limit, nextPageToken }));
    }
  };

  useEffect(() => {
    if (status === 'succeeded' || status === 'failed') {
      setLoading(false);
    }
  }, [status]);

  const handlePlaylistClick = (playlistId) => {
    setSelectedPlaylistId(playlistId); // Store the selected playlist ID
    setShowModal(true); // Open modal
    document.body.style.overflow = 'hidden'; // Disable body scroll when modal is open
  };

  const closeModal = () => {
    setShowModal(false); 
    dispatch(resetPlaylist()); 
    document.body.style.overflow = '';
  };

  return (
    <div
      id="scrollableDiv"
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '20px 0',
      }}
    >
      <style>
        {`
          #scrollableDiv::-webkit-scrollbar {
            display: none;
          }
          #scrollableDiv {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>

      <InfiniteScroll
        dataLength={playlists.length}
        next={fetchData}
        hasMore={hasMore}
        loader={<h4 style={{ textAlign: 'center' }}>Loading...</h4>}
        endMessage={<p style={{ textAlign: 'center' }}><b>You've seen all your playlists!</b></p>}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <h1
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 10,
            padding: '10px',
            backgroundColor: '#2D2D2D',
            textAlign: 'center',
          }}
        >
          Your YouTube Playlists
        </h1>

        {playlists.map((playlist) => (
          <div key={playlist.id} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <YoutubePlaylistButton
              playlist={playlist}
              onClick={() => {
                setSelectedButtonId(playlist.id);
                handlePlaylistClick(playlist.id); // Open modal with the selected playlist ID
              }}
            />
          </div>
        ))}
      </InfiniteScroll>

      {status === 'failed' && <div>Error: {error}</div>}

      {/* Background blur overlay */}
      {showModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.6)', // Dark overlay
            backdropFilter: 'blur(10px)', // Apply blur to the background
            zIndex: 999, // Ensure it's below the modal content
          }}
        ></div>
      )}

      {/* ConvertModal Component */}
      <ConvertModal
        isOpen={showModal}
        onClose={closeModal} // Close modal and remove blur
        playlistId={selectedPlaylistId} // Pass the selected playlist ID to the modal
      />
    </div>
  );
};

export default YtPlaylistScroll;