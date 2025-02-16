import React from 'react';
import ConvertButton from './ConvertButton';
import { useDispatch, useSelector } from 'react-redux';

const ConvertModal = ({ isOpen, onClose, playlistId }) => {

  const { playlist, status, error } = useSelector((state) => state.ytPlaylistData); // Get playlist data from Redux
  if (!playlist) return null; // Don't render if modal is closed

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Dark overlay
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000, // Ensures it's above everything
      }}
      onClick={onClose} // Close modal when clicking outside
    >
      {/* Modal Content */}
      <div
        style={{
          backgroundColor: '#2D2D2D',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
          width: '90%',
          maxWidth: '500px', // Prevents modal from being too wide
          maxHeight: '80vh', // Prevents modal from exceeding screen height
          overflowY: 'auto', // Enables scrolling if needed
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', // Center content inside modal
        }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {/* Close Button */}
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
        <ConvertButton playlistId={playlistId} />
      </div>
    </div>
  );
};

export default ConvertModal;
