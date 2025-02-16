import React from 'react';
import { useDispatch, useSelector } from 'react-redux';  // Import useDispatch and useSelector

const ConvertButton = ({ playlistId }) => {
  const { playlist, status, error } = useSelector((state) => state.ytPlaylistData);
  const handleClick = async () => {
    // Check if a playlist has been selected (i.e., playlistId exists)
    if (!playlist) {
      return;  // Do nothing if no playlist is selected
    }
    else {
      // If the playlist data exists, log it
      console.log('this is the playlist your converting',playlist);
    } 
  };
  return (
    <button onClick={handleClick}>
      Convert
    </button>
  );
};

export default ConvertButton;
