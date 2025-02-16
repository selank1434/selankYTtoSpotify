const handleClick = () => {
    window.location.href = 'http://localhost:8000/login-yt'; 
  };
const YTLoginButton = () => {
    return <button onClick={handleClick}>Login to Youtube</button>
}
export default YTLoginButton;