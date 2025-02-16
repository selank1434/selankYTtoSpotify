import React from 'react';

const TracksDisplay = ({ tracks }) => {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Tracks List</h2>
      <ul>
        {tracks && tracks.length > 0 ? (
          tracks.map((track, index) => (
            <li key={index} style={{ marginBottom: '10px' }}>
              <h3>{track.title}</h3>
              <p>{track.artist}</p>
              <p>{track.album}</p>
            </li>
          ))
        ) : (
          <p>No tracks available</p>
        )}
      </ul>
    </div>
  );
};

export default TracksDisplay;
