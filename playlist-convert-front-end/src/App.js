import './App.css';
import { useEffect } from 'react';
import { useDispatch} from 'react-redux';
import {spotifyLogIn, spotifyLogOut, youtubeLogIn,youtubeLogOut} from './redux/authSlice';
import LandingPage from './pages/LandingPage';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import ConvertPage from './pages/ConvertPage';
import DisplayPage from './pages/DisplaySpotify';

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
  }, [dispatch]); 
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/selectconvert" element={<ConvertPage/>} />
          <Route path="/PlaylistConverted" element={<DisplayPage/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
