import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch individual Spotify playlist details
export const fetchSpotifyPlaylistData = createAsyncThunk(
  'spotifyPlaylistData/fetchSpotifyPlaylistData',
  async (playlistId, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:8000/retrieve-spotify-playlist', {
        withCredentials: true,
        params: {
          playlistId: playlistId, // Pass the playlistId as a query parameter
        },
      });
      return response.data;  // Return the playlist data if the request is successful
    } catch (error) {
      // Handle errors and pass the error message
      return rejectWithValue(error.response?.data || 'Failed to fetch playlist details');
    }
  }
);

// Create the slice for storing the YouTube playlist details
const spotifyPlaylistDataSlice = createSlice({
  name: 'spotifyPlaylistData',
  initialState: {
    playlist: null,   
    status: 'idle',   
    error: null, 
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSpotifyPlaylistData.pending, (state) => {
        state.status = 'loading'; // Set the status to 'loading' while fetching
      })
      .addCase(fetchSpotifyPlaylistData.fulfilled, (state, action) => {
        state.status = 'succeeded';  // Update the status to 'succeeded' if the fetch is successful
        state.playlist = action.payload; // Store the playlist data in the state
      })
      .addCase(fetchSpotifyPlaylistData.rejected, (state, action) => {
        state.status = 'failed';    // Update status to 'failed' if the fetch fails
        state.error = action.payload; // Store the error message
      });
  },
});

export default spotifyPlaylistDataSlice.reducer;
