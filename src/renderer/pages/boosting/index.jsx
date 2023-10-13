import React, { useEffect, useState } from 'react';
const { ipcRenderer } = window.require('electron');
import '../../styles/boosting.scss';
import { useNavigate } from 'react-router-dom';

function Counter() {
    const [counterText, setCounterText] = useState("00d 00h 00m 00s");
    const [gameIds, setGameIds] = useState([]);
    const [gameData, setGameData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fechaInicio = new Date();
        const interval = setInterval(() => {
            const fechaActual = new Date();
            const tiempoTranscurrido = fechaActual - fechaInicio;

            const segundos = Math.floor((tiempoTranscurrido / 1000) % 60);
            const minutos = Math.floor((tiempoTranscurrido / 1000 / 60) % 60);
            const horas = Math.floor((tiempoTranscurrido / 1000 / 60 / 60) % 24);
            const dias = Math.floor(tiempoTranscurrido / 1000 / 60 / 60 / 24);

            const contadorTexto =
                (dias < 10 ? "0" : "") + dias + "d " +
                (horas < 10 ? "0" : "") + horas + "h " +
                (minutos < 10 ? "0" : "") + minutos + "m " +
                (segundos < 10 ? "0" : "") + segundos + "s";

            setCounterText(contadorTexto);
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
        <section className="content">
            <main className="centered">
                <h1 className="count">{counterText}</h1>
                <div className="games">
                    <p>It is being boosted for</p>
                    {displayedGames.map((game, index) => (
                        <div className='gameS' key={index}>
                            <img className='posterGame' src={game.img_icon_url} alt={`Icon for ${game.name}`} />
                            <span className='nameGame'>{game.name}</span>
                        </div>
                    ))}
                    {extraGamesCount > 0 && <span>and {extraGamesCount} games more</span>}
                </div>
                <button className='btn' onClick={stopBoost}>Stop Boosting</button>
            </main>
        </section>
    );
}

export default Counter;