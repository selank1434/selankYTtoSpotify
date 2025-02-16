import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch individual YouTube playlist details
export const fetchYoutubePlaylistData = createAsyncThunk(
  'youtubePlaylistData/fetchYoutubePlaylistData',
  async ({playlistId,playlistTitle}, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:8000/retrieve-yt-playlist', {
        withCredentials: true,
        params: {
          playlistId: playlistId, // Pass the playlistId as a query parameter
        },
      });
      console.log('response data',response.data);
      return {...response.data, title: playlistTitle };  // Return the playlist data if the request is successful
    } catch (error) {
      // Handle errors and pass the error message
      return rejectWithValue(error.response?.data || 'Failed to fetch YouTube playlist details');
    }
  }
);

// Create the slice for storing the YouTube playlist details
const youtubePlaylistDataSlice = createSlice({
  name: 'youtubePlaylistData',
  initialState: {
    playlist: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    resetPlaylist: (state) => {
      state.playlist = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchYoutubePlaylistData.pending, (state) => {
        state.status = 'loading'; // Set the status to 'loading' while fetching
      })
      .addCase(fetchYoutubePlaylistData.fulfilled, (state, action) => {
        state.status = 'succeeded';  // Update the status to 'succeeded' if the fetch is successful
        console.log('action payload',action.payload)
        state.playlist = action.payload; // Store the playlist data in the state
      })
      .addCase(fetchYoutubePlaylistData.rejected, (state, action) => {
        state.status = 'failed';    // Update status to 'failed' if the fetch fails
        state.error = action.payload; // Store the error message
      });
  },
});
export const { resetPlaylist } = youtubePlaylistDataSlice.actions;
export default youtubePlaylistDataSlice.reducer;
