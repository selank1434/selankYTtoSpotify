import React from 'react';
import YtPlaylistScroll from './YtPlaylistScroll';

const LoggedInPage = () => (
  <div
    style={{
      minHeight: '100vh', // Ensures the whole page scrolls if needed
      display: 'flex',
      justifyContent: 'center', // Centers horizontally
      alignItems: 'center', // Centers vertically
      backgroundColor: 'black',
      color: 'white',
      overflow: 'hidden', // Prevents unwanted horizontal scrolling
      padding: '20px 0',
    }}
  >
    {/* Scrollable Centered Container */}
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', // Centers YtPlaylistScroll vertically
        alignItems: 'center', // Centers YtPlaylistScroll horizontally
        width: '90%', // Responsive width
        maxWidth: '800px', // Limits max width
        backgroundColor: '#2D2D2D',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
        padding: '20px',
        overflowY: 'auto', // Allows internal scrolling
        maxHeight: '80vh', // Keeps it within the viewport
      }}
    >
      <YtPlaylistScroll scrollableTarget="leftDiv" />
    </div>
  </div>
);

export default LoggedInPage;

// import React from 'react';
// import YtPlaylistScroll from './YtPlaylistScroll';

// const LoggedInPage = () => (
//   <div
//     id="leftSideDiv"
//     style={{
//       height: '100vh',
//       width: '100vw',
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       backgroundColor: 'black',
//       color: 'white',
//       overflowY: 'auto', // Ensures scrolling works
//       scrollbarWidth: 'none',
//       msOverflowStyle: 'none',
//     }}
//   >
//     <YtPlaylistScroll scrollableTarget="leftSideDiv" />
//   </div>
// );

// export default LoggedInPage;
// import React from 'react';
// import YtPlaylistScroll from './YtPlaylistScroll';

// const LoggedInPage = () => (
//   <div
//     style={{
//       minHeight: '100vh', // Allows full-page scrolling
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       backgroundColor: 'black',
//       color: 'white',
//       padding: '20px 0', // Adds vertical spacing
//       overflowX: 'hidden', // Prevents horizontal scrolling
//     }}
//   >
//     {/* Main container for scrollable content */}
//     <div
//       style={{
//         flex: 1,
//         width: '100%', // Responsive width
//         // maxWidth: '800px',
//         backgroundColor: '#2D2D2D',
//         borderRadius: '8px',
//         boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
//         padding: '20px',
//         overflowY: 'auto', // Enables scrolling if needed
//         maxHeight: '100vh', // Prevents it from locking to the full screen height
//       }}
//     >
//       <YtPlaylistScroll scrollableTarget="leftDiv" />
//     </div>
//   </div>
// );

// export default LoggedInPage;


// import React from 'react';
// import LoginButton from './LoginButton';
// import YTLoginButton from './YTLoginButton';
// import PlaylistScroll from './PlaylistsScroll';
// import ConvertButton from './ConvertButton';
// import TestButton from './TestButton';
// import YtPlaylistScroll from './YtPlaylistScroll';
// import PlaylistPicker from './tiles';

// const LoggedInPage = () => (
//   <div
//     id="leftDiv"
//     style={{
//       height: '100vh', // Full viewport height
//       display: 'flex',
//       backgroundColor: 'black',
//       color: 'white',
//       padding: '0', // Full use of the screen without padding
//       justifyContent: 'center',
//       alignItems: 'center',
//     }}
//   >
//     {/* Left Div for Infinite Scroll */}
//     <div
//       style={{
//         minHeight: '100vh', // Full screen height or more if content overflows
//         flex: 1, // Take up 50% of the screen width
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'flex-start', // Align content at the top
//         alignItems: 'center',
//         padding: '0', // No padding
//         backgroundColor: '#2D2D2D',
//         borderRadius: '8px',
//         boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
//         overflowY: 'auto', // Scroll if content overflows vertically
//       }}
//     >
//       <YtPlaylistScroll scrollableTarget="leftDiv" />
//     </div>

//     {/* Right Div for Convert Button */}
//     <div
//       style={{
//         minHeight: '100vh', // Full screen height or more if content overflows
//         flex: 1, // Take up 50% of the screen width
//         display: 'flex',
//         flexDirection: 'column',
//         // justifyContent: 'center', // Center content vertically
//         alignItems: 'center',
//         padding: '20px',
//         backgroundColor: '#2D2D2D',
//         borderRadius: '8px',
//         boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
//         overflowY: 'auto', // Scroll if content overflows vertically
//       }}
//     >
//       <div style={{ width: '100%', height: '100%', maxWidth: '400px' }}>
//         <ConvertButton />
//       </div>
//     </div>
//   </div>
// );

// export default LoggedInPage;
