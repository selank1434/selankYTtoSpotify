import logo from './logo.svg';
import './App.css';
import Dropdown from './Dropdown';
import SelectableButton from './SelectableButton';
import LoginButton from './components/LoginButton';
import PlaylistScroll from './components/PlaylistsScroll';
import TestButton from './components/TestButton';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {spotifyLogIn, spotifyLogOut, youtubeLogIn,youtubeLogOut} from './redux/authSlice';
import LoggedInPage from './components/LoggedInPage';
import LoginPage from './components/LoginPage';
import LandingPage from './components/LandingPage';




function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const checkLoginStatus = async (login_url, logInAction,logOutAction) => {
      try {
        const response = await fetch(login_url, {
          method: 'GET',
          credentials: 'include', 
        });
        if (response.ok) {
            dispatch(logInAction());          
        } else {
            dispatch(logOutAction());
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };
    checkLoginStatus('http://localhost:8000/check-spotify-login',spotifyLogIn,spotifyLogOut);
    checkLoginStatus('http://localhost:8000/check-yt-login',youtubeLogIn,youtubeLogOut);
  }, [dispatch]); 
  const spotifyLoggedIn = useSelector((state) => state.auth.spotifyLoggedIn); 
  const ytLoggedIn = useSelector((state) => state.auth.youtubeLoggedIn); 
  return (
    <div className="App">
      {!spotifyLoggedIn || !ytLoggedIn? (
          // <LoginPage/>
          <LandingPage/>
        ) : (
          <LoggedInPage/>
        )}
    
    </div>
  );
}

export default App;
