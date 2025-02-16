import { createSlice } from '@reduxjs/toolkit';

// Define initial state for both Spotify and YouTube authentication
const initialState = {
  spotifyLoggedIn: false, // Spotify login state
  youtubeLoggedIn: false, // YouTube login state
};

const authSlice = createSlice({
  name: 'auth',  // Name of the slice
  initialState,
  reducers: {
    // Spotify login action
    spotifyLogIn: (state) => {
      state.spotifyLoggedIn = true;
    },
    spotifyLogOut: (state) => {
      state.spotifyLoggedIn = false;
    },
    // YouTube login action
    youtubeLogIn: (state) => {
      state.youtubeLoggedIn = true;
    },
    youtubeLogOut: (state) => {
      state.youtubeLoggedIn = false;
    },
  },
});

// Export actions to be dispatched from components
export const { spotifyLogIn, spotifyLogOut, youtubeLogIn, youtubeLogOut } = authSlice.actions;

// Export the reducer to be added to the store
export default authSlice.reducer;
