import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch YouTube playlists
export const fetchYoutubePlaylists = createAsyncThunk(
  'youtubePlaylists/fetchYoutubePlaylists',
  async ({ offset, limit, nextPageToken }, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:8000/retrieve-yt-playlists', {
        withCredentials: true,
        params: { limit, offset, nextPageToken },  // Pass offset, limit, and nextPageToken as query params
      });
      console.log('slice', response.data);
      return response.data;  // Return the playlist data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch YouTube playlists');
    }
  }
);

// Create the slice for YouTube playlists
const youtubePlaylistsSlice = createSlice({
  name: 'youtubePlaylists',
  initialState: {
    playlists: [],          // Store playlist data
    status: 'idle',         // Track the status of the request (idle, loading, succeeded, failed)
    error: null,            // Store error message if the request fails
    hasMore: true,          // Check if there are more playlists to fetch
    offset: 0,              // For pagination purposes
    limit: 10,              // Limit the number of items per request
    nextPageToken: null,    // Token to fetch next set of playlists
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchYoutubePlaylists.pending, (state) => {
        state.status = 'loading';  // Set status to loading while fetching
      })
      .addCase(fetchYoutubePlaylists.fulfilled, (state, action) => {
        state.status = 'succeeded';  // Set status to succeeded when fetch is successful
        state.playlists = [...state.playlists, ...action.payload.items ];  // Append new playlists to the existing ones
        state.offset += state.limit;  // Update the offset for pagination
        state.hasMore = Boolean(action.payload.nextPageToken);  // Check if there are more playlists
        state.nextPageToken = action.payload.nextPageToken;  // Store the nextPageToken for pagination
      })
      .addCase(fetchYoutubePlaylists.rejected, (state, action) => {
        state.status = 'failed';  // Set status to failed if the fetch fails
        state.error = action.payload;  // Store the error message
      });
  }
});

export default youtubePlaylistsSlice.reducer;
