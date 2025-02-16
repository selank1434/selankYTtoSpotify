import React, { useState } from 'react';

const PlaylistPicker = () => {
  const [selectedPlaylists, setSelectedPlaylists] = useState({
    likedVideos: true,
    mySubscriptions: false,
    elvis: true,
    travisScott: true,
    react: false,
    discreteMath: true,
    grgh: true,
    ilya: false,
    takeAMoment: true,
    diss: true,
    k17: true,
  });

  const playlists = [
    { name: 'Liked videos', selectedCount: 597, totalCount: 597, imgSrc: '/images/favoriteSongs.svg' },
    { name: 'My Subscriptions (Artists)', selectedCount: 568, totalCount: 568, imgSrc: '/images/favoriteArtists.svg' },
    { name: 'elvis', selectedCount: 1, totalCount: 1, imgSrc: 'https://i.ytimg.com/vi/WrMGGouem3c/default.jpg' },
    { name: 'Travis Scott', selectedCount: 7, totalCount: 7, imgSrc: 'https://i.ytimg.com/vi/pildU9lK6vM/default.jpg' },
    { name: 'react', selectedCount: 17, totalCount: 17, imgSrc: 'https://i.ytimg.com/vi/PKwu15ldZ7k/default.jpg' },
    { name: 'Discrete Math', selectedCount: 1, totalCount: 1, imgSrc: 'https://i.ytimg.com/vi/Cn3lKC3g8pc/default.jpg' },
    { name: 'grgh', selectedCount: 5, totalCount: 5, imgSrc: 'https://i.ytimg.com/vi/843Lkl-4ww4/default.jpg' },
    { name: 'Ilya', selectedCount: 5, totalCount: 5, imgSrc: 'https://i.ytimg.com/vi/R3ERuL2HDA8/default.jpg' },
    { name: 'Take a moment count my glock', selectedCount: 13, totalCount: 13, imgSrc: 'https://i.ytimg.com/vi/nN51wZrSPzg/default.jpg' },
    { name: 'Diss', selectedCount: 11, totalCount: 11, imgSrc: 'https://i.ytimg.com/vi/61ATWDVQCZg/default.jpg' },
    { name: '2k17', selectedCount: 2, totalCount: 2, imgSrc: 'https://i.ytimg.com/img/no_thumbnail.jpg' },
  ];

  const handleCheckboxChange = (playlistName) => {
    setSelectedPlaylists(prevState => ({
      ...prevState,
      [playlistName]: !prevState[playlistName]
    }));
  };

  return (
    <div className="transfer_container__rURwu PlaylistPicker_playlistListContainer__yk3E7">
      <div>
        <div className="PlaylistPicker_pickerTitle__aTnr9">From Your YouTube Account</div>
        <div className="PlaylistPicker_rowTitle__NNsD0">
          <div className="PlaylistPicker_rowTitleLeft__4cyhM">
            <input type="checkbox" />
            <div className="FromToLogos_small__iK9Ib PlaylistPicker_platform___v_A_">
              <img src="/images/platformsLogo/YouTube.svg" alt="YouTube" />
            </div>
            <span>My YouTube Music Library</span>
          </div>
          <div className="PlaylistPicker_rowTitleRight__ooosh">
            <span className="PlaylistPicker_maxChar__7Sy_P">Seyon Elankumaran</span>
            <button className="transfer_switchAccountImg__k9Qor">
              <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="12" fill="url(#paint0_linear_4507_102196)" />
                <path
                  d="M15.8599 5.39795L19.9017 9.49892L15.8599 13.5999L15.1477 12.8979L18.0049 9.99892H9.89963V8.99892H18.0049L15.1477 6.0999L15.8599 5.39795ZM8.13944 10.3988L4.09766 14.4998L8.13944 18.6008L8.85167 17.8988L5.99448 14.9998H14.0997V13.9998H5.99448L8.85167 11.1008L8.13944 10.3988Z"
                  fill="white"
                />
                <defs>
                  <linearGradient id="paint0_linear_4507_102196" x1="22.8" y1="1.90909" x2="0.244861" y2="2.14339" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#5458CD" />
                    <stop offset="1" stopColor="#734ACB" />
                  </linearGradient>
                </defs>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {playlists.map((playlist, index) => (
        <div key={index}>
          <div className="PlayListRow_container__xPMsw">
            <div className="PlayListRow_glueContainer__vuSdF">
              <div className="PlayListRow_checkBoxContainer__sd9_I">
                <input
                  type="checkbox"
                  checked={selectedPlaylists[playlist.name.toLowerCase().replace(/\s+/g, '')]}
                  onChange={() => handleCheckboxChange(playlist.name.toLowerCase().replace(/\s+/g, ''))}
                />
              </div>
              <div className="PlayListRow_row__9ugjW PlayListRow_rotateChevron__29Og2">
                <div className="PlayListRow_leftSide__DQhNv">
                  <div className="PlayListRow_ImageContainer__XKo0X">
                    <img className="PlayListRow_ResourceImage__o44lP" src={playlist.imgSrc} alt="Playlist logo" />
                  </div>
                  <div>
                    <div className="PlayListRow_playListName__u_zkP">{playlist.name}</div>
                    <div className="PlayListRow_numSelectedText__neDKU">
                      {playlist.selectedCount}/{playlist.totalCount} selected
                    </div>
                  </div>
                </div>
                <div className="PlayListRow_expandContainer__3lltq">
                  <button>
                    <img alt="Expand" className="PlayListRow_expand__X1rcJ arrow false" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlaylistPicker;
