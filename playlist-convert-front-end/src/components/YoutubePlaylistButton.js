import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchYoutubePlaylistData } from '../redux/youtubePlaylistDataSlice';

const YoutubePlaylistButton = ({ playlist, isSelected, onClick }) => {
  const dispatch = useDispatch();
  
  const handleClick = () => {
    console.log('Button clicked:', playlist.id);
    console.log('playlist',playlist.snippet.title);
    
    // Dispatch the action to fetch playlist data, whether selected or not
    dispatch(fetchYoutubePlaylistData({
      playlistId: playlist.id,
      playlistTitle: playlist.snippet.title})); 
    onClick();  // Update the parent state to reflect the selected button
  };

  return (
    <button 
      onClick={handleClick} 
      style={{
        backgroundColor: isSelected ? 'green' : 'gray', // Change button color based on isSelected
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        margin: '5px',
        cursor: isSelected ? 'not-allowed' : 'pointer', // Disable cursor when selected
      }}
      disabled={isSelected} // Disable button if it is selected
    >
      {playlist.snippet.title} {/* Button text is the playlist title */}
    </button>
  );
};

export default YoutubePlaylistButton;
