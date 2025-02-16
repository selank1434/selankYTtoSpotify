const express = require('express');
const cors = require('cors');
const app = express();
const axios = require('axios');
const PORT = process.env.PORT || 8000;

const {encryptToken, decryptToken} = require('./tokenUtils');
const {createPlaylist, getCurrentUserProfile, searchSongs, addTracksToPlaylist} = require('./conversionHelpers');
const {google} = require('googleapis');
const url = require('url');
const session = require('express-session');


const cookieParser = require('cookie-parser');
require('dotenv').config();
const querystring = require('querystring');
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const YOUTUBE_CLIENT_SECRET = process.env.YOUTUBE_CLIENT_SECRET;
const YOUTUBE_CLIENT_ID = process.env.YOUTUBE_CLIENT_ID;
const COOKIE_ENCRYPT_KEY = process.env.COOKIE_ENCRYPT_KEY
const redirect_uri = 'http://localhost:8000/callback-spotify';
const yt_redirect_uri =  'http://localhost:8000/callbackyoutube';
const oauth2Client = new google.auth.OAuth2(
  YOUTUBE_CLIENT_ID,
  YOUTUBE_CLIENT_SECRET,
  yt_redirect_uri,
);


const cleanTitle = (title, artist) => title
.replace(new RegExp(`^${artist}\\s*-\\s*|\\s*\\[[^\\]]*\\]|\\s*\\([^)]*\\)`, 'g'), '')
.trim();

const cleanVideoOwnerChannelTitle = (channelTitle) => {
  return channelTitle.replace(/\bVEVO\b/i, '').trim(); // removes 'VEVO' and trims any extra spaces
};

const getTitles = (data) => {
  return data.map(item => {
    const title = item.snippet.title;
    const videoOwnerChannelTitle = cleanVideoOwnerChannelTitle(item.snippet.videoOwnerChannelTitle);
    
    // Assuming the artist's name is the first part before the hyphen
    const artist = title.split('-')[0].trim();
    
    // Clean the title to remove the artist's name and any parentheses
    const cleanedTitle = cleanTitle(title, artist);
    
    return {
      songTitle: cleanedTitle, // Song title without artist and extra information
      artist: artist,          // Artist's name
      videoOwnerChannel: videoOwnerChannelTitle // Cleaned video owner channel title
    };
  });
  };

const crypto = require('crypto');
app.use(express.json());  // This will allow Express to parse JSON request bodies
function generateRandomString(length) {
    return crypto.randomBytes(length).toString('hex').slice(0, length);
}
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',  
    credentials: true,
}));


// // app.js
// const express = require('express');
// const cors = require('cors');
// const axios = require('axios');
// const { google } = require('googleapis');
// const cookieParser = require('cookie-parser');
// const crypto = require('crypto');
// const { encryptToken, decryptToken, createPlaylist } = require('./tokenUtils');
// const config = require('./config');

// const app = express();
// const oauth2Client = new google.auth.OAuth2(
//   config.YOUTUBE.CLIENT_ID,
//   config.YOUTUBE.CLIENT_SECRET,
//   config.YOUTUBE.REDIRECT_URI
// );

// app.use(express.json());
// app.use(cookieParser());
// app.use(cors(config.CORS));

function generateRandomString(length) {
  return crypto.randomBytes(length).toString('hex').slice(0, length);
}

// Define your routes and middleware here

// app.listen(confiPORT, () => {
//   console.log(`Server is running on port ${config.PORT}`);
// });

app.get('/check-spotify-login', (req, res) => {
  const token = req.cookies.access_token; 
  if (token) {
    return res.status(200).json({ loggedIn: true });
  } else {
    return res.status(401).json({ loggedIn: false });
  }
});

app.get('/check-yt-login', (req, res) => {
  const token = req.cookies.yt_access_token; 
  if (token) {
    return res.status(200).json({ loggedIn: true });
  } else {
    return res.status(401).json({ loggedIn: false });
  }
});

app.get('/login', (req, res) => {
    const state = generateRandomString(16);
    const scope = 'user-read-private user-read-email playlist-read-private playlist-modify-public playlist-modify-private';
    console.log('hit login button');


    res.redirect('https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: SPOTIFY_CLIENT_ID,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
    }));
});

app.get('/login-yt', (req, res) => {
  const scopes = [
    'https://www.googleapis.com/auth/youtube.force-ssl'
  ];
  
  // Generate a secure random state value.
  // const state = crypto.randomBytes(32).toString('hex');
  
  // // Store state in the session
  // req.session.state = state;
  
  // Generate a url that asks permissions for the Drive activity and Google Calendar scope
  const authorizationUrl = oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: 'offline',
    /** Pass in the scopes array defined above.
      * Alternatively, if only one scope is needed, you can pass a scope URL as a string */
    scope: scopes,
    // Enable incremental authorization. Recommended as a best practice.
    include_granted_scopes: true,
    // Include the state parameter to reduce the risk of CSRF attacks.
    // state: state
  });
  res.redirect(authorizationUrl);
});


app.get('/callback-spotify', async (req, res) => {
    const {code, state} = req.query;
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      method: 'POST',
      data: querystring.stringify({
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code',
      }),
      headers: {
        'Authorization': 'Basic ' + Buffer.from(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    };
 
    // Exchange code for access token
    const response = await axios(authOptions);
    const {access_token, refresh_token, expires_in} = response.data;
    console.log('unencrypted access token',access_token);
    res.cookie('access_token', encryptToken(access_token, COOKIE_ENCRYPT_KEY), {
      httpOnly: true,
      maxAge: expires_in* 1000,
      sameSite: 'Lax',
      secure: false
    });
    res.redirect('http://localhost:3000');
    
});

app.get('/callbackyoutube', async (req, res) => {
  const {code, state} = req.query;
  // console.log('code',code);
  // console.log('state',state);
  const { tokens } = await oauth2Client.getToken(code);
  const {access_token,expiry_date} = tokens;
  res.cookie('yt_access_token', encryptToken(access_token, COOKIE_ENCRYPT_KEY), {
    httpOnly: true,
    maxAge: expiry_date,
    sameSite: 'Lax',
    secure: false
  });
  oauth2Client.setCredentials(tokens);
  // console.log('here is oauth2 cleint data',oauth2Client);
  res.redirect('http://localhost:3000');
  
});



app.get('/retrieveSpotifyPlaylists', async (req, res) => {
  const accessToken = req.cookies['access_token'];
  const access_token = decryptToken(accessToken, COOKIE_ENCRYPT_KEY);
  // Check if the bearer token exists
  if (!accessToken) {
      return res.status(401).send('User is not authenticated');
  }
  try {
      const limit = req.query.limit || 50;
      const offset = req.query.offset || 0;
      const response = await axios.get('https://api.spotify.com/v1/me/playlists', {
        params: { 
            limit: 10, 
            offset: 0   
        },
        headers: {
            'Authorization': `Bearer ${access_token}`,
        }
      });
      console.log('response data',response.data);
      res.json(response.data);
  } catch (error) {
      console.log('In error block');
      return res.status(500).send('Error fetching playlists');
  }
});


app.get('/retrieve-spotify-playlist', async (req, res) => {
  try {
    const playlistId = req.query.playlistId;
    const accessToken = req.cookies['access_token'];
    console.log('here is my access token', accessToken);
    const access_token = decryptToken(accessToken, COOKIE_ENCRYPT_KEY);
    console.log('Here is my playlistId:', playlistId);

    if (!playlistId) {
      return res.status(400).send('playlistId is required');
    }

    // Define the parameters for the Spotify API request
    const market = 'ES'; // Example: Country code (optional)
    const limit = 10;    // Example: Number of items to return (optional)
    const offset = 0;    // Example: Start at the beginning of the playlist (optional)
    const fields = 'items(track(name,href,artists(name),album(name,href)))'; // Include artist names

    // Make the GET request to Spotify API
    const response = await axios({
      method: 'get',
      url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      headers: {
        'Authorization': `Bearer ${access_token}`,
      },
      params: {
        market,
        fields,
        limit,
        offset,
      }
    });
    console.log(response.data);
    // Send back the response from Spotify API
    res.json(response.data);
  } catch (error) {
    console.error('Error retrieving playlist:', error.response ? error.response.data : error.message);
    res.status(500).send('Error retrieving playlist data');
  }
});








app.get('/retrieve-yt-playlists', async (req, res) => {
  const limit = req.query.limit || 50;
  const offset = req.query.offset || 0; 
  const nextPageToken = req.query.nextPageToken;
  console.log('what next page token is in retreive yt playlists',nextPageToken);
  const yt = google.youtube({
    version: 'v3',
    auth: oauth2Client
  });

  const params = {
    mine: true,
    part: 'snippet',
    maxResults: limit,
  };

  // // console.log(JSON.stringify(oauth2Client));
  // const response = await yt.playlists.list({
  //   mine: true,
  //   part: 'snippet',
  //   maxResults: 10,
  // })

  if (nextPageToken) {
    params.pageToken = nextPageToken;  // Conditionally include pageToken
  }

  const response = await yt.playlists.list(params);

  // console.log('response data',response.data);
  console.log('retireiveing playlists', response);
  res.json(response.data);

  // try {
  //     const limit = req.query.limit || 50;
  //     const offset = req.query.offset || 0; 
  //     const response = await axios.get('https://www.googleapis.com/youtube/v3/playlists', {
  //       params: {
  //           part: 'snippet',   
  //           mine: true,        
  //           maxResults: limit,
  //           pageToken: offset
  //       },
  //       headers: {
  //           'Authorization': `Bearer ${access_token}`,
  //       }
  //     });

  //     res.json(response.data);
  // } catch (error) {
  //     // console.log('In error block', error);
  //     return res.status(500).send('Error fetching playlists');
  // }
});

app.post('/convertYtPlaylist', async (req, res) => {;
  const playlist = req.body; 

  console.log('here is what is in my playlist object',playlist.playlist);
  const song_items = playlist.playlist.items;

  const titles = getTitles(song_items);

  const playlist_title = playlist.playlist.title;
  
  console.log('play list title', playlist_title);

  const accessToken = req.cookies['access_token'];
  const access_token = decryptToken(accessToken, COOKIE_ENCRYPT_KEY);

  const {id: user_id} = await getCurrentUserProfile(access_token);

  const new_tracks = await searchSongs(access_token,titles,user_id);


  const uris = new_tracks.map(item => {
    const albumUri = item.album.uri;
    const trackUri = item.uri;
  
    // Collect the URIs of both album and track
    return {
      albumUri: albumUri,
      trackUri: trackUri
    };
  });
  console.log('here are the uris', uris);
  const playlist_id = await createPlaylist(access_token,user_id,playlist_title);
  console.log('here is my playlist if', playlist_id);

  const done = await addTracksToPlaylist(playlist_id,access_token,uris);
  console.log('done');

  res.json({uris});

  // try {
  //     const limit = req.query.limit || 50;
  //     const offset = req.query.offset || 0; 
  //     const response = await axios.get('https://www.googleapis.com/youtube/v3/playlists', {
  //       params: {
  //           part: 'snippet',   
  //           mine: true,        
  //           maxResults: limit,
  //           pageToken: offset
  //       },
  //       headers: {
  //           'Authorization': `Bearer ${access_token}`,
  //       }
  //     });

  //     res.json(response.data);
  // } catch (error) {
  //     // console.log('In error block', error);
  //     return res.status(500).send('Error fetching playlists');
  // }
});



app.get('/retrieve-yt-playlist', async (req, res) => {
  console.log('yt playlist retrieved');
  const { playlistId, limit = 50, pageToken = '' } = req.query;

  if (!playlistId) {
    return res.status(400).send('playlistId is required');
  }

  // Initialize the YouTube API client
  const yt = google.youtube({
    version: 'v3',
    auth: oauth2Client  // Ensure oauth2Client is properly set up with an access token
  });

  try {
    // Make the request to YouTube API
    const response = await yt.playlistItems.list({
      part: 'snippet',      // Use 'snippet' to get details like title, videoId, etc.
      playlistId: playlistId,  // Playlist ID passed from the query
      maxResults: limit,    // Maximum results per page (default to 50 if not provided)
      pageToken: pageToken, // Pagination token if needed for fetching next pages
    });

    // Send the response back with playlist items
    res.json(response.data);

  } catch (error) {
    console.error('Error fetching playlist items:', error);
    return res.status(500).send('Error fetching playlist items');
  }
});

app.post('/convert-playlist', async (req, res) => {
  
  const { playlists, limit = 50, pageToken = '' } = req.query;

  if (!playlistId) {
    return res.status(400).send('playlistId is required');
  }

  // Initialize the YouTube API client
  const yt = google.youtube({
    version: 'v3',
    auth: oauth2Client  // Ensure oauth2Client is properly set up with an access token
  });

  try {
    // Make the request to YouTube API
    const response = await yt.playlistItems.list({
      part: 'snippet',      // Use 'snippet' to get details like title, videoId, etc.
      playlistId: playlistId,  // Playlist ID passed from the query
      maxResults: limit,    // Maximum results per page (default to 50 if not provided)
      pageToken: pageToken, // Pagination token if needed for fetching next pages
    });

    // Send the response back with playlist items
    res.json(response.data);

  } catch (error) {
    console.error('Error fetching playlist items:', error);
    return res.status(500).send('Error fetching playlist items');
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
