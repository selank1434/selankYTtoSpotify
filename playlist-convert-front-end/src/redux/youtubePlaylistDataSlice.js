import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchYoutubePlaylistData = createAsyncThunk(
  'youtubePlaylistData/fetchYoutubePlaylistData',
  async ({playlistId,playlistTitle}, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:8000/retrieve-yt-playlist', {
        withCredentials: true,
        params: {
          playlistId: playlistId, 
        },
      });
      return {...response.data, title: playlistTitle }; 
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch YouTube playlist details');
    }
  }
);

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
    removeItem: (state,action) => {
      state.playlist.items = state.playlist.items.filter(item => item.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchYoutubePlaylistData.pending, (state) => {
        state.status = 'loading'; 
      })
      .addCase(fetchYoutubePlaylistData.fulfilled, (state, action) => {
        state.status = 'succeeded'; 
        state.playlist = action.payload; 
      })
      .addCase(fetchYoutubePlaylistData.rejected, (state, action) => {
        state.status = 'failed';    
        state.error = action.payload;
      });
  },
});
export const { resetPlaylist, removeItem } = youtubePlaylistDataSlice.actions;
export default youtubePlaylistDataSlice.reducer;
