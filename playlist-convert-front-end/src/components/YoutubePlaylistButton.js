import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { fetchYoutubePlaylistData } from '../redux/youtubePlaylistDataSlice';

const YoutubePlaylistButton = ({ playlist, onClick }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(fetchYoutubePlaylistData({
      playlistId: playlist.id,
      playlistTitle: playlist.snippet.title
    }));
    onClick(); // Update the parent state to reflect the selected button
  };

  return (
    <Button 
      onClick={handleClick} 
      variant="contained"
      color="primary"
      sx={{
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
        '&:hover': {
          backgroundColor: '#616161', // Adjusted hover color for better contrast
        }
      }}
    >
      {playlist.snippet.title}
    </Button>
  );
};

export default YoutubePlaylistButton;
