import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

const ConvertButton = () => {
  const { playlist, status, error } = useSelector((state) => state.ytPlaylistData); // Get playlist data from Redux
  const [showTracks, setShowTracks] = useState(false); // State to control if tracks should be shown

  useEffect(() => {
    // Once playlist data is available, automatically show the tracks
    if (playlist) {
      setShowTracks(true);
    }
  }, [playlist]); // This will run when the `playlist` data changes

  const handleClick = async () => {
    // Only show tracks if a playlist exists
    if (playlist) {
      console.log('This is the playlist you are converting:', playlist);

      // Display titles of all tracks in the playlist
      const response = await axios.post('http://localhost:8000/convertYtPlaylist', { playlist }, { withCredentials: true });
      console.log('here is my response to convert click');
      console.log(response);
    }
  };

  return (
    <div style={styles.container}>
      {playlist && showTracks && playlist.items && playlist.items.length > 0 && (
        <div style={styles.trackList}>
          <h2 style={styles.title}>Tracks: {playlist.title}</h2>
          <div style={styles.trackItems}>
            {/* Map through the playlist items and display track titles */}
            {playlist.items.map((item, index) => (
              <div key={item.id} style={styles.trackItem}>
                {index + 1}. {item.snippet.title} {/* Display track number and title */}
              </div>
            ))}
          </div>
        </div>
      )}

      {status === 'failed' && <div style={styles.error}>Error: {error}</div>}
      <button style={styles.button} onClick={handleClick}>
        Convert
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#2D2D2D',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
    maxWidth: '400px',
    width: '100%',
    margin: '20px auto',
    overflow: 'hidden', // Ensures no scrollbar appears
  },
  title: {
    fontSize: '1.5rem',
    color: 'white',
    marginBottom: '10px',
  },
  trackList: {
    maxHeight: '400px',
    overflowY: 'auto',
    width: '100%',
    marginBottom: '20px',
  },
  trackItems: {
    marginTop: '10px',
  },
  trackItem: {
    margin: '10px 0',
    padding: '10px',
    backgroundColor: '#444',
    borderRadius: '4px',
    color: 'white',
  },
  button: {
    backgroundColor: '#1DB954',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '10px 20px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s ease',
    width: '100%',
    maxWidth: '200px',
    textAlign: 'center',
  },
  buttonHover: {
    backgroundColor: '#1aa34a',
  },
  error: {
    color: 'red',
    fontSize: '1rem',
    marginTop: '10px',
  },
};

export default ConvertButton;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import InfiniteScroll from 'react-infinite-scroll-component'; // Import InfiniteScroll

// import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch and useSelector

// const ConvertButton = ({ playlistId }) => {
//   const { playlist, status, error } = useSelector((state) => state.ytPlaylistData); // Get playlist data from Redux
//   const [showTracks, setShowTracks] = useState(false); // State to control if tracks should be shown
//   const [itemsToShow, setItemsToShow] = useState(10); // State to track how many items to show initially

//   useEffect(() => {
//     // Once playlist data is available, automatically show the tracks
//     if (playlist) {
//       setShowTracks(true);
//     }
//   }, [playlist]); // This will run when the `playlist` data changes

//   const handleClick = async () => {
//     // Only show tracks if a playlist exists
//     if (playlist) {
//       console.log('This is the playlist you are converting:', playlist);

//       // Display titles of all tracks in the playlist
//       const response = await axios.post('http://localhost:8000/convertYtPlaylist', { playlist }, { withCredentials: true });
//       console.log('here is my response to convert click');
//       console.log(response);
//     }
//   };

//   // Function to load more items
//   const loadMoreItems = () => {
//     setItemsToShow((prev) => prev + 10); // Increase the number of items shown by 10 on each load
//   };

//   return (
//     <div>
//       {playlist && showTracks && playlist.items && playlist.items.length > 0 && (
//         <div>
//           <h1>Tracks: {playlist.title}</h1>
//           <div style={{ margin: '20px 0' }}>
//             {/* InfiniteScroll wrapper for the playlist items */}
//             <InfiniteScroll
//               dataLength={itemsToShow} // Length of the items to display
//               next={loadMoreItems} // Function to load more items
//               hasMore={itemsToShow < playlist.items.length} // Check if there are more items to load
//               loader={<h4>Loading...</h4>} // Loader while loading more items
//               endMessage={<p style={{ textAlign: 'center' }}><b>You have seen all your tracks!</b></p>} // Message when all items are loaded
//             >
//               {/* Map through the playlist items and display track titles */}
//               {playlist.items.slice(0, itemsToShow).map((item, index) => (
//                 <div key={item.id} style={{ margin: '10px 0', padding: '10px' }}>
//                   {index + 1}. {item.snippet.title} {/* Display track number and title */}
//                 </div>
//               ))}
//             </InfiniteScroll>
//           </div>
//         </div>
//       )}

//       {status === 'failed' && <div>Error: {error}</div>}
//       <button onClick={handleClick}>
//         Convert
//       </button>
//     </div>
//   );
// };

// export default ConvertButton;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch and useSelector

// const ConvertButton = ({ playlistId }) => {
//   const { playlist, status, error } = useSelector((state) => state.ytPlaylistData); // Get playlist data from Redux
//   const [showTracks, setShowTracks] = useState(false); // State to control if tracks should be shown

//   useEffect(() => {
//     // Once playlist data is available, automatically show the tracks
//     if (playlist) {
//       setShowTracks(true);
//     }
//   }, [playlist]); // This will run when the `playlist` data changes

//   const handleClick = async () => {
//     // Only show tracks if a playlist exists
//     if (playlist) {
//       console.log('This is the playlist you are converting:', playlist);

//       // Display titles of all tracks in the playlist
//       const response = await axios.post('http://localhost:8000/convertYtPlaylist', {playlist}, {withCredentials: true});
//       console.log('here is my response to convert click');
//       console.log(response);
//     }
//   };

//   return (
//     <div 
    
//     >
//       {playlist && showTracks && playlist.items && playlist.items.length > 0 && (
//         <div>
//           <h2>Tracks: {playlist.title}</h2>
//           <div style={{ margin: '20px 0' }}>
//             {/* Map through the playlist items and display track titles */}
//             {playlist.items.map((item, index) => (
//               <div key={item.id} style={{ margin: '10px 0', padding: '10px' }}>
//                 {index + 1}. {item.snippet.title} {/* Display track number and title */}
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {status === 'failed' && <div>Error: {error}</div>}
//       <button onClick={handleClick}>
//         Convert
//       </button>

//     </div>
//   );
// };

// export default ConvertButton;







// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';  // Import useDispatch and useSelector

// const ConvertButton = ({ playlistId }) => {
//   const { playlist, status, error } = useSelector((state) => state.ytPlaylistData);
//   const handleClick = async () => {
//     // Check if a playlist has been selected (i.e., playlistId exists)
//     if (!playlist) {
//       return;  // Do nothing if no playlist is selected
//     }
//     else {
//       // If the playlist data exists, log it
//       console.log('this is the playlist your converting',playlist);
//     } 
//   };
//   return (
//     <button onClick={handleClick}>
//       Convert
//     </button>
//   );
// };

// export default ConvertButton;
