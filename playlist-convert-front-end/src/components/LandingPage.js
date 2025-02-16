import React from "react";
import LoginButton from "./LoginButton";
import SelectPlaylistButton from "./SelectPlaylistButton";
const LandingPage = () => {
  return (
    <div style={{ backgroundColor: 'black', color: 'white', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', width: '100%', maxWidth: '4xl' }}>
        <header style={{ padding: '3rem' }}>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold' }}>Convert YouTube to Spotify</h1>
          <p style={{ marginTop: '1rem', color: '#A1A1A1' }}>Transfer your music library from YouTube into a Spotify playlist in a few easy steps</p>
          <button style={{ marginTop: '1.5rem', padding: '0.75rem 1.5rem', backgroundColor: '#7F3E9E', borderRadius: '0.375rem', color: 'white', fontSize: '1.125rem', cursor: 'pointer' }}>
            Let's Start
          </button>
        </header>
        <section style={{ backgroundColor: '#2D2D2D', color: 'white', padding: '4rem 1rem', borderRadius: '0.375rem' }}>
          <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold' }}>How to get started?</h2>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', marginTop: '2.5rem' }}>
            <div style={{ width: '80%', padding: '1.5rem', backgroundColor: '#444', borderRadius: '0.375rem' }}>
              <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>1</span>
              <LoginButton 
                redirect_url={'http://localhost:8000/login'}
                link_text={'Login to Spotify'}
                />
            </div>
            <div style={{ width: '80%', padding: '1.5rem', backgroundColor: '#444', borderRadius: '0.375rem' }}>
              <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>2</span>
              <LoginButton
               redirect_url={'http://localhost:8000/login-yt'}
               link_text={'Login to Youtube'}
               />
            </div>
            <div style={{ width: '80%', padding: '1.5rem', backgroundColor: '#444', borderRadius: '0.375rem', textAlign: "center" }}>
              <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>3</span>
              <div>
                <SelectPlaylistButton/>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;
