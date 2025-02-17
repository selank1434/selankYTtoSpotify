import React from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TracksToConvert from './TracksToConvert';
import { useSelector } from 'react-redux';

const ConvertModal = ({ isOpen, onClose, playlistId }) => {
  const { playlist } = useSelector((state) => state.ytPlaylistData);
  if (!playlist) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle 
        sx={{ 
          bgcolor:'#2D2D2D',
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          color: 'White',
        }}
      >
        Tracks: {playlist.title}
        <IconButton onClick={onClose} size="small">
          <CloseIcon sx={{ color: 'white' }} />
        </IconButton>
      </DialogTitle>
      <DialogContent 
        sx={{ 
          bgcolor:'#2D2D2D', 
          color: 'white',
          minHeight: '100%', // Ensures it fills available space
          display: 'flex',
          flexDirection: 'column',
        }} 
      >
        <TracksToConvert playlistId={playlistId} />
      </DialogContent>
    </Dialog>
  );
};

export default ConvertModal;
