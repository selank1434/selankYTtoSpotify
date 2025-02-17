import { configureStore } from '@reduxjs/toolkit';
import authReducer from './redux/authSlice'; 
import playlistsReducer from './redux/playlistsSlice';  
import ytPlaylistsReducer from './redux/youtubePlaylistsSlice';  
import ytPlaylistDataReducer from './redux/youtubePlaylistDataSlice';  

const store = configureStore({
  reducer: {
    auth: authReducer,               
    playlists: playlistsReducer,     
    ytPlaylists: ytPlaylistsReducer, 
    ytPlaylistData: ytPlaylistDataReducer,
  },
});

export default store;
