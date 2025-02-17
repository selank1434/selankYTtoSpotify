import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, Button, List, ListItem, ListItemText, ListItemAvatar, Avatar, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { removeItem } from '../redux/youtubePlaylistDataSlice';
import { useDispatch } from 'react-redux';

const TracksToConvert = () => {
  const dispatch = useDispatch();
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
        await axios.post('http://localhost:8000/convertYtPlaylist', playlist, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true
        });
        window.location.href = 'http://localhost:3000/PlaylistConverted';
      } catch (error) {
        console.error('Error during API request:', error);
      }
    }
  };

  const handleItemDelete = (item) => {  
    dispatch(removeItem(item.id));
  };
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2, height: '100%' }}>
      {playlist && showTracks && playlist.items?.length > 0 && (
        <div>
          <List sx={{ maxHeight: '100%', overflowY: 'auto', padding: 0 }}>
            {playlist.items.map((item, index) => (
              <ListItem key={item.id} sx={{ borderBottom: 'none', display: 'flex', alignItems: 'center' }}>
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
                {/* X Button to delete item */}
                <IconButton onClick={() => handleItemDelete(item)} sx={{ color: 'white', ml: 1 }}>
                  <CloseIcon />
                </IconButton>
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
