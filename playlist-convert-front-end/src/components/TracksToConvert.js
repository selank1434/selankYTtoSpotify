import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

const TracksToConvert = () => {
  const { playlist, status, error } = useSelector((state) => state.ytPlaylistData); // Get playlist data from Redux
  console.log('here is playlist in tracks to convert', TracksToConvert);
  const [showTracks, setShowTracks] = useState(false); // State to control if tracks should be shown

  useEffect(() => {
    if (playlist) {
      setShowTracks(true);
    }
  }, [playlist]);

  const handleClick = async () => {
    if (playlist) {
      window.location.href = 'http://localhost:3000/PlaylistConverted';
    }
  };

  return (
    <div style={styles.container}>
      {playlist && showTracks && playlist.items && playlist.items.length > 0 && (
        <div style={styles.trackList}>
          <h2 style={styles.title}>Tracks: {playlist.title}</h2>
          <div style={styles.trackItems}>
            {/* Map through the playlist items and display track titles */}
            {playlist.items.map((item, index) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px',
                  borderBottom: '1px solid #ddd',
                }}
              >
                <span style={{ flexGrow: 1, textAlign: 'left' }}>
                  {index + 1}. {item.snippet.title}
                </span>  
                {item.snippet.thumbnails?.default?.url ? (
                  <img
                    src={item.snippet.thumbnails.default.url}
                    alt="YouTube Thumbnail"
                    style={{ width: '50px', height: 'auto', marginLeft: '10px' }}
                  />
                  ) : (
                  <span style={{ marginLeft: '10px' }}>No image available</span> // Or use a placeholder image
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {status === 'failed' && <div style={styles.error}>Error: {error}</div>}
      <button style={styles.button} onClick={handleClick}>
        Convert
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#2D2D2D',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
    maxWidth: '400px',
    width: '100%',
    margin: '20px auto',
    overflow: 'hidden',
  },
  title: {
    fontSize: '1.5rem',
    color: 'white',
    marginBottom: '10px',
  },
  trackList: {
    maxHeight: '400px',
    overflowY: 'auto',
    width: '100%',
    marginBottom: '20px',
  },
  trackItems: {
    marginTop: '10px',
  },
  trackItem: {
    margin: '10px 0',
    padding: '10px',
    backgroundColor: '#444',
    borderRadius: '4px',
    color: 'white',
  },
  button: {
    backgroundColor: '#1DB954',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '10px 20px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s ease',
    width: '100%',
    maxWidth: '200px',
    textAlign: 'center',
  },
  buttonHover: {
    backgroundColor: '#1aa34a',
  },
  error: {
    color: 'red',
    fontSize: '1rem',
    marginTop: '10px',
  },
};

export default TracksToConvert;