import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchYoutubePlaylists = createAsyncThunk(
  'youtubePlaylists/fetchYoutubePlaylists',
  async ({ offset, limit, nextPageToken }, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:8000/retrieve-yt-playlists', {
        withCredentials: true,
        params: { limit, offset, nextPageToken }, 
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch YouTube playlists');
    }
  }
);

const youtubePlaylistsSlice = createSlice({
  name: 'youtubePlaylists',
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
      .addCase(fetchYoutubePlaylists.pending, (state) => {
        state.status = 'loading'; 
      })
      .addCase(fetchYoutubePlaylists.fulfilled, (state, action) => {
        state.status = 'succeeded';  
        state.playlists = [...state.playlists, ...action.payload.items ];
        state.offset += state.limit;
        state.hasMore = Boolean(action.payload.nextPageToken);
        state.nextPageToken = action.payload.nextPageToken;
      })
      .addCase(fetchYoutubePlaylists.rejected, (state, action) => {
        state.status = 'failed'; 
        state.error = action.payload;
      });
  }
});

export default youtubePlaylistsSlice.reducer;
