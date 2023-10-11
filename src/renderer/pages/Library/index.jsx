import { useState, useEffect } from 'react';
const { ipcRenderer } = window.require('electron');
import '../../styles/library.scss';

async function openData() {
  try {
    let data = await dataInfo();
    while (data === 'userNotLoggedIn') {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      data = await dataInfo();
    }

    console.log(data);

    sessionStorage.setItem('data', JSON.stringify(data));
  } catch (error) {
    console.error(error);
  }
}

function dataInfo() {
  return new Promise((resolve, reject) => {
    ipcRenderer.send('dataInfo');

    ipcRenderer.once('dataInfo', (event, data) => {
      try {
        if (data) {
          resolve(data);
        } else if (data === 'userNotLoggedIn') {
          reject(new Error('The user is not logged in'));
        } else {
          reject(new Error('Error opening the library window'));
        }
      } catch (error) {
        reject(error);
      }
    });
  });
}

const Library = () => {
  const [availableGames, setAvailableGames] = useState([]);
  const [selectedGames, setSelectedGames] = useState([]);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [playerLevel, setPlayerLevel] = useState('');
  const [gameCount, setGameCount] = useState('');
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    openData();

    setTimeout(() => {
      const existingData = sessionStorage.getItem('data');
    
      if (existingData) {
        const userData = JSON.parse(existingData);
        const { info, games, infoLevel } = userData;
    
        const userLevelValue = Object.values(infoLevel)[0];
    
        setAvatarUrl(info.avatar_url_full);
        setPlayerName(info.player_name);
        setGameCount(games.app_count);
        setPlayerLevel(userLevelValue);
    
        const sortedGames = games.apps.map((game) => ({ ...game, appid: game.appid })).sort((a, b) => a.name.localeCompare(b.name));
        setAvailableGames(sortedGames);
      } else {
        console.log("No data found in sessionStorage.");
      }
    }, 2000);

  }, []);

  const filteredGames = availableGames.filter((game) =>
    game.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const moveGame = (game) => {
    if (selectedGames.length < 5) {
      const index = availableGames.findIndex((g) => g.appid === game.appid);
      if (index !== -1) {
        const updatedAvailableGames = [...availableGames];
        updatedAvailableGames.splice(index, 1);
        setSelectedGames([...selectedGames, game]);
        setAvailableGames(updatedAvailableGames);
      }
    } else {
      alert('In this version, you can only select a maximum of 5 games.');
    }
  };

  const moveGameToAvailable = (game) => {
    const index = selectedGames.findIndex((g) => g.appid === game.appid);
    if (index !== -1) {
      const updatedSelectedGames = [...selectedGames];
      updatedSelectedGames.splice(index, 1);
      setAvailableGames([...availableGames, game].sort((a, b) => a.name.localeCompare(b.name)));
      setSelectedGames(updatedSelectedGames);
    }
  };

  const handleRunBooster = () => {
    const selectedGameIds = selectedGames.map((game) => game.appid);

    if (selectedGameIds.length === 0) {
      alert('Select at least 1 game to be boosted.');
    } else {
      ipcRenderer.send('start-boost', selectedGameIds);
    }
  };

  const displaySelectedGames = () => {
    return selectedGames.map((game) => (
      <li className="li-games" key={game.appid} onClick={() => moveGameToAvailable(game)}>
        <img
          src={game.img_icon_url}
          className="poster"
          style={{ maxWidth: '64px' }}
          draggable={false}
          alt=""
        />
        <div className="contentGames">
          <p>{game.name}</p>
          <p className="hours">{(game.playtime_forever / 60).toFixed(1)} h played</p>
        </div>
      </li>
    ));
  };

  const displayAvailableGames = () => {
    return filteredGames.map((game) => (
      <li className="li-games" key={game.appid} onClick={() => moveGame(game)}>
        <img
          src={game.img_icon_url}
          className="poster"
          style={{ maxWidth: '64px' }}
          draggable={false}
          alt=""
        />
        <div className="contentGames">
          <p>{game.name}</p>
          <p className="hours">{(game.playtime_forever / 60).toFixed(1)} h played</p>
        </div>
      </li>
    ));
  };

  return (
    <div>
      <div className="header">
        {avatarUrl ? <img src={avatarUrl} className="avatar" alt="" />:<img src="https://avatars.akamai.steamstatic.com/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg" className="avatar" alt="" />}
        {playerName ? <div>
          <div className="playerName">
            {playerName}
            <div className={`level-${playerLevel}`}>
              <span className="level-number">{playerLevel}</span>
            </div>
            </div>
          <p className="countGames">{gameCount} games owned</p>
        </div>:<div>Not Data found</div>}
      </div>
      <div className="container">
        <div className="containerGames">
          <div>
            <div className="game-box">
              <div className="header-sub">
                <p className="box-title">Library</p>
                <div className="right-content">
                  <div className="searchContent">
                    <input
                      type="text"
                      className="search"
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                      placeholder="Search games..."
                    />
                    <div className="searchIco"></div>
                  </div>
                </div>
              </div>
              <div className="space-box-title"></div>
              <ul className="list-games-ul">{displayAvailableGames()}</ul>
            </div>

            <div className="game-box">
              <div className="header-sub">
                <p className="box-title">Game Selected</p>
              </div>
              <div className="space-box-title"></div>
              <ul className="list-games-ul">{displaySelectedGames()}</ul>
            </div>
          </div>
        </div>
        <div className="buttonContent">
          <button className="btn" onClick={handleRunBooster}>
            Run Booster
          </button>
        </div>
      </div>
    </div>
  );
};

export default Library;