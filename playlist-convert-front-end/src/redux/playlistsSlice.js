import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { act } from 'react';

export const fetchPlaylists = createAsyncThunk(
  'playlists/fetchPlaylists',
  async ({ offset, limit, nextPageToken }, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:8000/retrieveSpotifyPlaylists', {
        withCredentials: true,
        params: { limit, offset, nextPageToken },
      });
      return response.data;  // Return the playlist data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch playlists');
    }
  }
);

// Create the slice
const playlistsSlice = createSlice({
  name: 'playlists',
  initialState: {
    playlists: [],
    status: 'idle',
    error: null,
    hasMore: true,
    offset: 0,
    limit: 10, 
    nextPageToken: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlaylists.pending, (state) => {;
        state.status = 'loading';
      })
      .addCase(fetchPlaylists.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.playlists = [...state.playlists, ...action.payload.items]; 
        state.offset += state.limit; 
        state.hasMore = Boolean(action.payload.nextPageToken); // Ensure nextPageToken is truthy
        state.nextPageToken=action.payload.nextPageToken;
      })
      .addCase(fetchPlaylists.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export default playlistsSlice.reducer;
