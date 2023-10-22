import React, { useEffect, useState } from 'react';
const { ipcRenderer } = window.require('electron');
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as Theme from './BoostingUI'

function Counter() {
    const [counterText, setCounterText] = useState("00d 00h 00m 00s");
    const [gameIds, setGameIds] = useState([]);
    const [gameData, setGameData] = useState([]);
    const { t } = useTranslation();
    const navigate = useNavigate();

    useEffect(() => {
        const startDate = new Date();
        setInterval(() => {
            const currentDate = new Date();
            const elapsedTime = currentDate - startDate;
        
            const seconds = Math.floor((elapsedTime / 1000) % 60);
            const minutes = Math.floor((elapsedTime / 1000 / 60) % 60);
            const hours = Math.floor((elapsedTime / 1000 / 60 / 60) % 24);
            const days = Math.floor(elapsedTime / 1000 / 60 / 60 / 24);
        
            const counterText =
                (days < 10 ? "0" : "") + days + "d " +
                (hours < 10 ? "0" : "") + hours + "h " +
                (minutes < 10 ? "0" : "") + minutes + "m " +
                (seconds < 10 ? "0" : "") + seconds + "s";
        
            setCounterText(counterText);
        }, 1000);

        const sessionGames = sessionStorage.getItem('games');
        if (sessionGames) {
            const games = JSON.parse(sessionGames);
            setGameIds(games);
        }
    }, []);

    useEffect(() => {

        const sessionData = sessionStorage.getItem('data');
        if (sessionData) {
            const data = JSON.parse(sessionData);

            const gameData = gameIds.map(id => {
                const gameInfo = data.games.apps.find(app => app.appid === id);
                if (gameInfo) {
                    return {
                        img_icon_url: gameInfo.img_icon_url,
                        name: gameInfo.name,
                    };
                }
                return null;
            }).filter(Boolean);

            setGameData(gameData);
        }
    }, [gameIds]);

    const displayedGames = gameData.slice(0, 3);
    const extraGamesCount = gameData.length - displayedGames.length;

    function stopBoost() {
        ipcRenderer.send('stop-boost');
        navigate('/library');
    }

    return (
        <Theme.Container>
            <Theme.Center>
                <Theme.CountText>{counterText}</Theme.CountText>
                <Theme.Games>
                    <Theme.Text>{t('BoostingFor')}</Theme.Text>
                    {displayedGames.map((game, index) => (
                        <Theme.GamesContent key={index}>
                            <Theme.Poster src={game.img_icon_url} alt={`Icon for ${game.name}`} />
                        </Theme.GamesContent>
                    ))}
                    {extraGamesCount > 0 && <Theme.Text>{t('And')} {extraGamesCount} {t('More')}</Theme.Text>}
                </Theme.Games>
                <Theme.Button onClick={stopBoost}>{t('Stop')}</Theme.Button>
            </Theme.Center>
        </Theme.Container>
    );
}

export default Counter;