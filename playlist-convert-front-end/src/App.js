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
import LandingPage from './components/LandingPage';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ConvertPage from './pages/ConvertPage';

// function Home() {
//   return <h2>Home Page</h2>;
// }

// function About() {
//   return <h2>About Page</h2>;
// }

// function Contact() {
//   return <h2>Contact Page</h2>;
// }



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
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/about" element={<ConvertPage/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
