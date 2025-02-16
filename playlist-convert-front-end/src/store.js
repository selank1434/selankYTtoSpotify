import { configureStore } from '@reduxjs/toolkit';
import authReducer from './redux/authSlice';  // Import authSlice
import playlistsReducer from './redux/playlistsSlice';  // Import Spotify playlistsSlice
import ytPlaylistsReducer from './redux/youtubePlaylistsSlice';  // Import YouTube playlistsSlice
import ytPlaylistDataReducer from './redux/youtubePlaylistDataSlice';  // Import YouTube playlist data slice (if needed)

const store = configureStore({
  reducer: {
    auth: authReducer,               // Auth state (Spotify and YouTube login states)
    playlists: playlistsReducer,     // Spotify playlists state
    ytPlaylists: ytPlaylistsReducer, // YouTube playlists state
    ytPlaylistData: ytPlaylistDataReducer,  // YouTube playlist data state (if needed)
  },
});

export default store;
