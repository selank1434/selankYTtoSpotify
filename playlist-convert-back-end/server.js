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
const escapeStringRegexp = require('escape-string-regexp').default;

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

const crypto = require('crypto');
app.use(express.json());
const cleanTitle = (title, artist) => {
  const escapedArtist = escapeStringRegexp(artist);
  return title
    .replace(new RegExp(`^${escapedArtist}\\s*-\\s*|\\s*\\[[^\\]]*\\]|\\s*\\([^)]*\\)`, 'g'), '')
    .trim();
};

const cleanVideoOwnerChannelTitle = (channelTitle) => {
  if(!channelTitle) return '';
  return channelTitle.replace(/\bVEVO\b/i, '').trim();
};

const getTitles = (data) => {
  return data.map(item => {
    const title = item.snippet.title;
    const videoOwnerChannelTitle = cleanVideoOwnerChannelTitle(item.snippet.videoOwnerChannelTitle);
    const artist = title.split('-')[0].trim();
    const cleanedTitle = cleanTitle(title, artist);
    
    return {
      songTitle: cleanedTitle, 
      artist: artist,      
      videoOwnerChannel: videoOwnerChannelTitle
    };
  });
};

function generateRandomString(length) {
    return crypto.randomBytes(length).toString('hex').slice(0, length);
}
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',  
    credentials: true,
}));

function generateRandomString(length) {
  return crypto.randomBytes(length).toString('hex').slice(0, length);
}

app.get('/check-spotify-login', (req, res) => {
  const token = req.cookies.access_token; 
  if (token) {
    return res.status(200).json({ loggedIn: true });
  } else {
    return res.status(401).json({ loggedIn: false });
  }
});

app.get('/login-spotify', (req, res) => {
    const state = generateRandomString(16);
    const scope = 'user-read-private user-read-email playlist-read-private playlist-modify-public playlist-modify-private';
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
  const { tokens } = await oauth2Client.getToken(code);
  // const {access_token,expiry_date,refresh_token} = tokens;

  // res.cookie('yt_access_token', encryptToken(access_token, COOKIE_ENCRYPT_KEY), {
  //   httpOnly: true,
  //   maxAge: expiry_date,
  //   sameSite: 'Lax',
  //   secure: false
  // });
  oauth2Client.setCredentials(tokens);
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
      res.json(response.data);
  } catch (error) {
      return res.status(500).send('Error fetching playlists');
  }
});


app.get('/retrieve-spotify-playlist', async (req, res) => {
  try {
    const playlistId = req.query.playlistId;
    const accessToken = req.cookies['access_token'];
    const access_token = decryptToken(accessToken, COOKIE_ENCRYPT_KEY);
    if (!playlistId) {
      return res.status(400).send('playlistId is required');
    }

    const market = 'ES'; 
    const limit = 10;    
    const offset = 0;    
    const fields = 'items(track(name,href,artists(name),album(name,href)))'; // Include artist names

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
  const yt = google.youtube({
    version: 'v3',
    auth: oauth2Client
  });

  const params = {
    mine: true,
    part: 'snippet',
    maxResults: limit,
  };

  if (nextPageToken) {
    params.pageToken = nextPageToken;  // Conditionally include pageToken
  }

  const response = await yt.playlists.list(params);
  res.json(response.data);

});

app.post('/convertYtPlaylist', async (req, res) => {;
  const playlist = req.body;   
  const song_items = playlist.items;

  const titles = getTitles(song_items);

  const playlist_title = playlist.title;
  
  const accessToken = req.cookies['access_token'];
  const access_token = decryptToken(accessToken, COOKIE_ENCRYPT_KEY);

  const {id: user_id} = await getCurrentUserProfile(access_token);

  const new_tracks = await searchSongs(access_token,titles);


  const uris = new_tracks.map(item => {
    const albumUri = item.album.uri;
    const trackUri = item.uri;
  
    // Collect the URIs of both album and track
    return {
      albumUri: albumUri,
      trackUri: trackUri
    };
  });

  const playlist_id = await createPlaylist(access_token,user_id,playlist_title);

  const done = await addTracksToPlaylist(playlist_id,access_token,uris);


  res.json({done});
});



app.get('/retrieve-yt-playlist', async (req, res) => {
  const { playlistId, limit = 50, pageToken = '' } = req.query;

  if (!playlistId) {
    return res.status(400).send('playlistId is required');
  }

  const yt = google.youtube({
    version: 'v3',
    auth: oauth2Client 
  });

  try {
    const response = await yt.playlistItems.list({
      part: 'snippet',    
      playlistId: playlistId, 
      maxResults: limit,   
      pageToken: pageToken, 
    });

    res.json(response.data);

  } catch (error) {
    console.error('Error fetching playlist items:', error);
    return res.status(500).send('Error fetching playlist items');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
