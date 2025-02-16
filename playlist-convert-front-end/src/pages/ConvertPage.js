import React from 'react';
import YtPlaylistScroll from '../components/YtPlaylistScroll';

const ConvertPage = () => (
  <div
    style={{
      minHeight: '100vh', 
      display: 'flex',
      justifyContent: 'center', 
      alignItems: 'center', 
      backgroundColor: 'black',
      color: 'white',
      overflow: 'hidden',
      padding: '20px 0',
    }}
  >
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%', 
        maxWidth: '800px', 
        backgroundColor: '#2D2D2D',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
        padding: '20px',
        overflowY: 'auto', 
        maxHeight: '80vh',
      }}
    >
      <YtPlaylistScroll scrollableTarget="leftDiv" />
    </div>
  </div>
);

export default ConvertPage;