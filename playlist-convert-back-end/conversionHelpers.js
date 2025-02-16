const axios = require('axios');

const createPlaylist = async (accessToken, userId,playlist_title) => {
  console.log('here is user_id')
  console.log(userId);
  const playlistData = {
    name: playlist_title,   
    public: true,           
    collaborative: false,
    description: 'A new playlist created using the Spotify Web API'
  };
  try {
    const response = await axios.post(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      playlistData,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    
    const {id} = response.data;
    return id;
  } catch (error) {
    console.error('Error creating playlist:', error.response ? error.response.data : error.message);
  }
};

const searchSongs = async (accessToken, titles, user_id) => {
    const tracks = [];
    console.log('here are my titles', titles);
    const songSearchPromises = titles.map(title => searchSong(title.songTitle,title.artist,accessToken));
    const songResults = await Promise.all(songSearchPromises);

    // Append the results to the tracks array
    songResults.forEach(result => {
      if (result) {
        tracks.push(result); // Add the found track to the array
      }
    });

    // const help = await addTracksToPlaylist(playlist_id,accessToken,tracks);

    return tracks;
  };
  
  const searchSong = async (title, artist,accessToken) => {
    // console.log('title',title);
    // console.log('artist',artist);
    // console.log('accessToken',accessToken);
    const url = 'https://api.spotify.com/v1/search';

    const params = {
      q: `track:${title} artist:${artist}`,
      type: 'track',
      limit: 1,
    };
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
  
    try {
      const response = await axios.get(url, { params, headers });
      const tracks = response.data.tracks.items;
      if (tracks.length > 0) {
        return tracks[0]; // Return the first track if found
      } else {
        console.log('No tracks found. Title: ', title,' artist:', artist);
        return null; // No track found
      }
    } catch (error) {
      console.error('Error searching for song:', error);
      return null; // Error occurred
    }
  };
  
/**
 * Fetches the current user's profile information from Spotify.
 * @param {string} accessToken - The OAuth 2.0 access token for the current user.
 * @returns {Promise<Object>} - A promise that resolves to the user's profile data.
 */
const getCurrentUserProfile = async (accessToken) => {
    try {
      const response = await axios.get('https://api.spotify.com/v1/me', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching user profile:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

  
  const addTracksToPlaylist = async (playlistId, accessToken, uris) => {
    // Construct the query parameter 'uris' as a comma-separated string
    const trackUris = uris.map(item => item.trackUri);
    if(trackUris.length === 0){
      return {};
    }

    const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;

    try {
      // Prepare the request body
      const body = {
        uris: trackUris, // The array of track URIs
      };
  
      // Make the POST request with the URIs in the body
      const response = await axios.post(url, body, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
  
      console.log('Successfully added tracks to the playlist:', response.data);
      return response.data; // This contains the snapshot ID of the playlist.
    } catch (error) {
      console.error('Error adding tracks to the playlist:', error.response ? error.response.data : error.message);
      throw error; // Handle the error appropriately
    }
  }
  
  
module.exports = { createPlaylist, getCurrentUserProfile, searchSongs, addTracksToPlaylist };  // Ensure you're exporting the function
