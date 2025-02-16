import axios from 'axios';
const fetchData = async() => {
    await axios.get('http://localhost:8000/retrieveSpotifyPlaylists', {withCredentials: true} )
        .then((response) => {
        console.log('Spotify Playlist:', response.data);
    })
    .catch((error) => {
      console.error('Error retrieving playlists:', error);
    });
}

const TestButton = () => {

    return <button onClick={fetchData}>Spotify -- Yt</button>
}
export default TestButton;