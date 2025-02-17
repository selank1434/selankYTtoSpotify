import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, Button, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import axios from 'axios';
const TracksToConvert = () => {
  const { playlist, status, error } = useSelector((state) => state.ytPlaylistData);
  const [showTracks, setShowTracks] = useState(false);

  useEffect(() => {
    if (playlist) {
      setShowTracks(true);
    }
  }, [playlist]);


  const handleClick = async () => {  
    if (playlist) {
      try {
        const response = await axios.post('http://localhost:8000/convertYtPlaylist', playlist, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true
        });
  
        console.log('Response from API:', response.data);
        window.location.href = 'http://localhost:3000/PlaylistConverted';
      } catch (error) {
        console.error('Error during API request:', error);
      }
    }
  };
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2, height: '100%' }}>
      {playlist && showTracks && playlist.items?.length > 0 && (
        <div>
        {/* <Paper sx={{ width: '100%', p: 2, bgcolor: '#2D2D2D', flexGrow: 1, display: 'flex', flexDirection: 'column', border: 'none' }}> */}
          <List sx={{ maxHeight: '100%', overflowY: 'auto', padding: 0 }}>
            {playlist.items.map((item, index) => (
              <ListItem key={item.id} sx={{ borderBottom: 'none' }}>
                <ListItemText
                  primary={`${index + 1}. ${item.snippet.title}`}
                  slotProps={{ primary: { sx: { color: 'white' } } }} 
                />
                {item.snippet.thumbnails?.default?.url ? (
                  <ListItemAvatar>
                    <Avatar src={item.snippet.thumbnails.default.url} alt="Thumbnail" />
                  </ListItemAvatar>
                ) : (
                  <Typography variant="body2" sx={{ ml: 1, color: 'black' }}>No image</Typography>
                )}
              </ListItem>
            ))}
          </List>
        </div>
      )}

      {status === 'failed' && <Typography sx={{ color: 'red', mt: 2 }}>Error: {error}</Typography>}

      <Button
        variant="contained"
        color="success"
        onClick={handleClick}
        sx={{ mt: 2, width: '100%', maxWidth: 200 }}
      >
        Convert
      </Button>
    </Box>
  );
};

export default TracksToConvert;
