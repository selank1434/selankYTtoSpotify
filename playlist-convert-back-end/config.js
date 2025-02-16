require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 8000,
  SPOTIFY: {
    CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
    CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
    REDIRECT_URI: 'http://localhost:8000/callback-spotify',
  },
  YOUTUBE: {
    CLIENT_ID: process.env.YOUTUBE_CLIENT_ID,
    CLIENT_SECRET: process.env.YOUTUBE_CLIENT_SECRET,
    REDIRECT_URI: 'http://localhost:8000/callbackyoutube',
  },
  COOKIE_ENCRYPT_KEY: process.env.COOKIE_ENCRYPT_KEY,
  CORS: {
    ORIGIN: 'http://localhost:3000',
    CREDENTIALS: true,
  },
};
