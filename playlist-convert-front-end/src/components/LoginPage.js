import React from 'react';
import LoginButton from './LoginButton';
import YTLoginButton from './YTLoginButton';

const LoginPage = () => (
  <div style={{height: '100vh', display: 'flex', }} >
    <div
      style={{
        flex: 1, // Take up equal space
        display: 'flex',
        justifyContent: 'center', // Center content horizontally
        alignItems: 'center', // Center content vertically
        color: 'black',
      }}
    >
      <LoginButton/>
    </div>

    {/* Right Div */}
    <div
      style={{
        flex: 1, // Take up equal space
        display: 'flex',
        justifyContent: 'center', // Center content horizontally
        alignItems: 'center', // Center content vertically
        color: 'black',
      }}
    >
      <YTLoginButton/>
    </div>
  </div>
);

export default LoginPage;
