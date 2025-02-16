import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchYoutubePlaylistData } from '../redux/youtubePlaylistDataSlice';
const YoutubePlaylistButton = ({ playlist, onClick }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(fetchYoutubePlaylistData({
      playlistId: playlist.id,
      playlistTitle: playlist.snippet.title
    })); 
    onClick();  // Update the parent state to reflect the selected button
  };

  return (
    <button 
      onClick={handleClick} 
      style={{
        backgroundColor: '#808080', 
        color: 'white',
        border: 'none',
        padding: '10px',
        margin: '5px',
        fontSize: '1.5rem', 
        width: '100%',
        maxWidth: '600px',
        textAlign: 'center',
        fontWeight: 'bold', 
      }}
    >
      {playlist.snippet.title}
    </button>
  );
};

export default YoutubePlaylistButton;
