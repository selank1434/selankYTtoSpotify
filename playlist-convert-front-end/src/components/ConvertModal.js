import React from 'react';
import TracksToConvert from './TracksToConvert';
import { useDispatch, useSelector } from 'react-redux';

const ConvertModal = ({ isOpen, onClose, playlistId }) => {

  const { playlist, status, error } = useSelector((state) => state.ytPlaylistData); // Get playlist data from Redux
  if (!playlist) return null; 

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.6)', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#2D2D2D',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
          width: '90%',
          maxWidth: '500px',
          maxHeight: '80vh', 
          overflowY: 'auto', 
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', 
        }}
        onClick={(e) => e.stopPropagation()} 
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'transparent',
            border: 'none',
            color: 'white',
            fontSize: '1.5rem',
            cursor: 'pointer',
          }}
        >
          ✖
        </button>
        <TracksToConvert playlistId={playlistId} />
      </div>
    </div>
  );
};

export default ConvertModal;
