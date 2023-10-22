import { useState, useEffect } from 'react';
const { ipcRenderer } = window.require('electron');
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import * as Theme from './LibraryUI'
import '../../styles/steamLevels.css'

const Version = styled.p`
  color: #8d8d8d;
  position: absolute;
  bottom:-40px;
  right:5px;
`

async function openData() {
  try {
    let data = await dataInfo();
    while (data === 'userNotLoggedIn') {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      data = await dataInfo();
    }

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

function getLevelClassAndStyle(playerLevel) {
  const level = parseInt(playerLevel, 10);
  if (isNaN(level)) {
    return {
      className: 'steamLevel',
      style: {
        border: '2px solid #9b9b9b',
        borderRadius: '50%',
      },
    };
  }

  let className;
  let style = {};

  if (level < 100) {
    style.border = `2px solid ${getColorForSteamLevel(level)}`;
    style.borderRadius = '50%';
    className = 'steamLevel';
  } else {
    const steamLevel2 = Math.floor((level - 100) / 10);
    const classIndex = Math.floor((level - 100) / 100) + 2;
    className = `steamLevel${Math.min(53, classIndex)}`;
    style.backgroundPosition = `0 ${-32 * (steamLevel2 % 10)}px`;
  }

  return {
    className,
    style,
  };
}

function getColorForSteamLevel(level) {
  const colors = [
    '#9b9b9b',
    '#c02942',
    '#d95b43',
    '#fecc23',
    '#467a3c',
    '#4e8ddb',
    '#7652c9',
    '#c252c9',
    '#542437',
    '#997c52'
  ];

  const steamLevel = Math.floor(level / 10);

  return colors[steamLevel % 10];
}


const Library = () => {
  const [availableGames, setAvailableGames] = useState([]);
  const [selectedGames, setSelectedGames] = useState([]);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [playerLevel, setPlayerLevel] = useState('');
  const [gameCount, setGameCount] = useState('');
  const [vacBans, setVacBans] = useState('');
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { className, style } = getLevelClassAndStyle(playerLevel);

  useEffect(() => {
    setLoading(true);
    openData();

    setTimeout(() => {
      const existingData = sessionStorage.getItem('data');
    
      if (existingData) {
        const userData = JSON.parse(existingData);
        const { info, games, infoLevel, data} = userData;

        setAvatarUrl(info.avatar_url_full);
        setPlayerName(info.player_name);
        
        setTimeout(() => {
          if (games && games.app_count) {
            setGameCount(games.app_count);
          } else {
            console.error("The object 'games' or its property 'app_count' are not defined.");
          }

          if (infoLevel && Object.keys(infoLevel).length > 0) {
            const userLevelValue = Object.values(infoLevel)[0]
            setPlayerLevel(userLevelValue);
          }
        }, 500);

        const sortedGames = games.apps.map((game) => ({ ...game, appid: game.appid })).sort((a, b) => a.name.localeCompare(b.name));
        setAvailableGames(sortedGames);

        if (data.isChecked) {
          const accounts = JSON.parse(localStorage.getItem('accounts')) || [];

          const duplicateAccount = accounts.find((account) =>
            account.password === data.password && account.username === data.username
          );

          if (!duplicateAccount) {
            accounts.push({
              password: data.password,
              username: data.username,
              avatar_url_full: info.avatar_url_full,
              player_name: info.player_name,
            });

            localStorage.setItem('accounts', JSON.stringify(accounts));
          }
        }

        setLoading(false);
      } else {
        console.log("No data found in sessionStorage.");
      }
    }, 2000);

  }, []);

  const filteredGames = availableGames.filter((game) =>
    game.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const moveGame = (game) => {
    if (selectedGames.length < 33) {
      const index = availableGames.findIndex((g) => g.appid === game.appid);
      if (index !== -1) {
        const updatedAvailableGames = [...availableGames];
        updatedAvailableGames.splice(index, 1);
        setSelectedGames([...selectedGames, game]);
        setAvailableGames(updatedAvailableGames);
      }
    } else {
      alert(t('MaxGames'));
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
      alert(t('MinGames'));
    } else {

      if (sessionStorage.getItem('games')) {
        sessionStorage.removeItem('games');
      }
      sessionStorage.setItem('games', JSON.stringify(selectedGameIds));

      ipcRenderer.send('start-boost', selectedGameIds);

      navigate('/boosting')
    }
  };

  const displaySelectedGames = () => {
    return selectedGames.map((game) => (
      <Theme.GamesList key={game.appid} onClick={() => moveGameToAvailable(game)}>
        <img
          src={game.img_icon_url}
          className="poster"
          style={{ maxWidth: '64px' }}
          draggable={false}
          alt=""
        />
        <div className="contentGames">
          <p>{game.name}</p>
          <p className="hours">{(game.playtime_forever / 60).toFixed(1)} {t('Played')}</p>
        </div>
      </Theme.GamesList>
    ));
  };

  const displayAvailableGames = () => {
    return filteredGames.map((game) => (
      <>
      {game.img_icon_url && <Theme.GamesList key={game.appid} onClick={() => moveGame(game)}>
        <img
          src={game.img_icon_url}
          className="poster"
          style={{ maxWidth: '64px' }}
          draggable={false}
          alt=""
        />
        <div className="contentGames">
          <p>{game.name}</p>
          <p className="hours">{(game.playtime_forever / 60).toFixed(1)} {t('Played')}</p>
        </div>
      </Theme.GamesList>}
      </>
    ));
  };

  return (
    <>
    {loading ?
      <Theme.ContainerLoad>
        <main>
          <Theme.ContentLoad>
            <Theme.Loading/>
          </Theme.ContentLoad>
          <p className="titleLoad">{t('LoadData')}</p>
        </main>
      </Theme.ContainerLoad>
      :
      <Theme.Container>
        <Theme.Header>
          {avatarUrl ? <img src={avatarUrl} className="avatar" alt="" />:<img src="https://avatars.akamai.steamstatic.com/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg" className="avatar" alt="" />}
          {playerName ? <div>
            <div className="playerName">
              {playerName}
              <div className={className} style={style}>
                <span className="level-number">{playerLevel}</span>
              </div>
            </div>
            <p className="countGames">{gameCount} {t('GamesOwned')}</p>
          </div>:<div>Not Data found</div>}
        </Theme.Header>
        <div>
          <Theme.ContainerGames >
            <div>
              <Theme.Box>
                <Theme.HeaderBox>
                  <p className="box-title">{t('Library')}</p>
                  <div className="right-content">
                    <div className="searchContent">
                      <input
                        type="text"
                        className="search"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        placeholder={t('Search')}
                      />
                      <div className="searchIco"></div>
                    </div>
                  </div>
                </Theme.HeaderBox>
                <Theme.Space/>
                <ul className="list-games-ul">{displayAvailableGames()}</ul>
              </Theme.Box>

              <Theme.Box>
                <Theme.HeaderBox>
                  <p className="box-title">{t('Selected')}</p>
                </Theme.HeaderBox>
                <Theme.Space/>
                <ul className="list-games-ul">{displaySelectedGames()}</ul>
              </Theme.Box>

            </div>
          </Theme.ContainerGames>
          <Theme.ButtonContainer>
            <Theme.Button onClick={handleRunBooster}>
              {t('Run')}
            </Theme.Button>
          </Theme.ButtonContainer>
        </div>
        <Version>v0.4.5</Version>
      </Theme.Container>}
    </>
  );
};

export default Library;