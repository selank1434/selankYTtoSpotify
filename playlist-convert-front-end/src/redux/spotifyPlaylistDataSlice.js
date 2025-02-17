import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchSpotifyPlaylistData = createAsyncThunk(
  'spotifyPlaylistData/fetchSpotifyPlaylistData',
  async (playlistId, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:8000/retrieve-spotify-playlist', {
        withCredentials: true,
        params: {
          playlistId: playlistId, 
        },
      });
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch playlist details');
    }
  }
);

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
        state.status = 'loading';
      })
      .addCase(fetchSpotifyPlaylistData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.playlist = action.payload;
      })
      .addCase(fetchSpotifyPlaylistData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default spotifyPlaylistDataSlice.reducer;
