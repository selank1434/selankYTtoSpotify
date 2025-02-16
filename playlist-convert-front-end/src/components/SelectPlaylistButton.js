import { Button } from '@mui/material';

function SelectPlaylistButton() {
  const handleClick = () => {
    window.location.href = 'http://localhost:3000/about';
  };

  return (
    <Button
    variant="contained"
    sx={{
      mt: 2, // marginTop
      px: 3,
      py: 1.5,
      bgcolor: 'purple', // Button color
      color: 'white',
      fontSize: '1.125rem',
      textTransform: 'none',
      '&:hover': { bgcolor: 'darkviolet' }, // Darker shade on hover
    }}
    onClick={handleClick}
  >
      Convert My Playlist
    </Button>
  );
}

export default SelectPlaylistButton;
