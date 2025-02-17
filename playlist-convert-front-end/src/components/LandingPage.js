import React from 'react';
import { Box, Typography } from '@mui/material';
import ButtonLink from './ButtonLink';

const LandingPage = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'black',
        color: 'white',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box sx={{ textAlign: 'center', width: '100%', maxWidth: '4xl' }}>
        <header>
          <Typography variant="h3" sx={{ fontWeight: 'bold', padding: '3rem', marginBottom: '6rem' }}>
            Convert YouTube to Spotify
          </Typography>
          <Typography sx={{ marginTop: '1rem', color: '#A1A1A1' }}>
            Transfer your music library from YouTube into a Spotify playlist in a few easy steps
          </Typography>
        </header>

        <section
          sx={{
            backgroundColor: '#2D2D2D',
            color: 'white',
            padding: '4rem 1rem',
            borderRadius: '0.375rem',
            marginTop: '6rem', // Increased the margin-top for more space
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2rem',
              marginTop: '2.5rem',
              padding: '2rem', // Added padding to the container
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              How to get started?
            </Typography>
            <Box
              sx={{
                width: '80%',
                padding: '1.5rem',
                backgroundColor: '#444',
                borderRadius: '0.375rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center', // Ensures everything is centered
              }}
            >
              <Typography sx={{ fontSize: '2rem', fontWeight: 'bold' }}>1</Typography>
              <ButtonLink
                redirect_url={'http://localhost:8000/login-spotify'}
                link_text={'Login to Spotify'}
              />
            </Box>

            {/* Step 2 */}
            <Box
              sx={{
                width: '80%',
                padding: '1.5rem',
                backgroundColor: '#444',
                borderRadius: '0.375rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center', // Ensures everything is centered
              }}
            >
              <Typography sx={{ fontSize: '2rem', fontWeight: 'bold' }}>2</Typography>
              <ButtonLink
                redirect_url={'http://localhost:8000/login-yt'}
                link_text={'Login to YouTube'}
              />
            </Box>

            {/* Step 3 */}
            <Box
              sx={{
                width: '80%',
                padding: '1.5rem',
                backgroundColor: '#444',
                borderRadius: '0.375rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center', // Ensures everything is centered
              }}
            >
              <Typography sx={{ fontSize: '2rem', fontWeight: 'bold' }}>3</Typography>
              <ButtonLink
                redirect_url={'http://localhost:3000/selectconvert'}
                link_text={'Select YouTube Playlist'}
              />
            </Box>
          </Box>
        </section>
      </Box>
    </Box>
  );
};

export default LandingPage;
