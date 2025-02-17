import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchSpotifyPlaylistData } from '../redux/spotifyPlaylistDataSlice'; // Import the action

const SpotifyPlaylistButton = ({ playlist }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(fetchSpotifyPlaylistData(playlist.id)); // Pass the playlist ID
  };

  return <button onClick={handleClick}>{playlist.name}</button>;
};

export default SpotifyPlaylistButton;
