const handleClick = () => {
  window.location.href = 'http://localhost:8000/login'; 
};
const LoginButton = () => {
  return <button onClick={handleClick}>Login to Spotify</button>
}
export default LoginButton;