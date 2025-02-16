const LoginButton = ({redirect_url,link_text}) => {
  const handleClick = () => {
    window.location.href = redirect_url; 
  };
  return (
     <p 
      style={{ marginTop: '0.5rem', cursor: 'pointer', textDecoration: 'underline' }} 
      onClick={handleClick}     
      >
        {link_text}
      </p>
      )
}
export default LoginButton;