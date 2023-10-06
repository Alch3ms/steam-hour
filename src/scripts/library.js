const { ipcRenderer } = require('electron');

document.addEventListener('DOMContentLoaded', async () => {
    const availableGamesList = document.getElementById('availableGamesList');
    const selectedGamesList = document.getElementById('selectedGamesList');
    const selectedGamesButton = document.getElementById('selectedGamesButton');

    let availableGames = [];
    let selectedGames = [];

    let originalAvailableGames = [];

    let fetchError = false;

    try {
        const userDataResponse = await fetch('http://localhost:7000/');
        if (!userDataResponse.ok) {
            window.location.reload();
        }
        const userData = await userDataResponse.json();

        var avatarImg = document.getElementById("avatar");
        var playerNameElement = document.getElementById("playerName");

        avatarImg.src = userData.avatar_url_full;
        playerNameElement.textContent = userData.player_name;

        const userGamesResponse = await fetch('http://localhost:7000/games');
        if (!userGamesResponse.ok) {
            window.location.reload();
        }
        const userGamesData = await userGamesResponse.json();

        var gameTotalDisplay = document.getElementById("countGames");
        gameTotalDisplay.textContent = `${userGamesData.app_count} games owned`;

        availableGames = userGamesData.apps.map(game => ({ ...game, appid: game.appid }));
        originalAvailableGames = [...availableGames];

        availableGames.sort((a, b) => {
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
        });

        displayAvailableGames();
    } catch (error) {
        console.error(error);
        fetchError = true;
        displayAvailableGames();
    }

    selectedGamesButton.addEventListener('click', () => {
        const selectedGameIds = selectedGames.map((game) => game.appid);
    
        if (selectedGameIds.length === 0) {
            alert('Select at least 1 game to be boosted.');
        } else {
            ipcRenderer.send('start-boost', selectedGameIds);
        }
    });

    const searchInput = document.getElementById('search');

    searchInput.addEventListener('input', () => {
        const searchText = searchInput.value.toLowerCase();
        const filteredGames = originalAvailableGames.filter((game) => {
            return game.name.toLowerCase().includes(searchText);
        });
        displayAvailableGames(filteredGames);
    });

    function displayAvailableGames(gamesToDisplay) {
        availableGamesList.innerHTML = '';
    
        const gamesToShow = gamesToDisplay || availableGames;
    
        if (gamesToShow.length === 0) {
            return;
        }
    
        if (fetchError) {
            const errorLi = document.createElement('li');
            errorLi.textContent = 'Error: No se pudieron obtener los datos de los juegos.';
            errorLi.className = 'error';
            availableGamesList.appendChild(errorLi);
        } else {
            const gamesWithImages = gamesToShow.filter((game) => game.img_icon_url);
            
            if (gamesWithImages.length === 0) {
                availableGames.sort((a, b) => {
                    const nameA = a.name.toLowerCase();
                    const nameB = b.name.toLowerCase();
                    if (nameA < nameB) return -1;
                    if (nameA > nameB) return 1;
                    return 0;
                });
    
                gamesToShow.forEach((game) => {
                    const li = createGameListItem(game);
                    li.addEventListener('click', () => {
                        moveGame(game);
                    });
                    availableGamesList.appendChild(li);
                });
            } else {
                gamesWithImages.forEach((game) => {
                    const li = createGameListItem(game);
                    li.addEventListener('click', () => {
                        moveGame(game);
                    });
                    availableGamesList.appendChild(li);
                });
            }
        }
    }

    function createGameListItem(game) {
        const li = document.createElement('li');
        const img = document.createElement('img');
        img.src = game.img_icon_url;
        img.className = 'poster';
        img.style.maxWidth = '64px';
        img.draggable = false;
        const div = document.createElement('div');
        div.className = 'contentGames';
        const titleGame = document.createElement('p');
        titleGame.textContent = game.name;
        const minutes = game.playtime_forever;
        const hours = (minutes / 60).toFixed(1);
        const hoursText = document.createElement('p');
        hoursText.textContent = hours + ' h played';
        hoursText.className = 'hours';
        div.appendChild(titleGame);
        div.appendChild(hoursText);
        li.className = 'li-games';
        li.appendChild(img);
        li.appendChild(div);
        return li;
    }
    

    function moveGame(game) {
        if (selectedGames.length < 5) {
            const index = availableGames.indexOf(game);
            if (index !== -1) {
                availableGames.splice(index, 1);
                selectedGames.push(game);
                displayAvailableGames();
                displaySelectedGames();
            }
        } else {
            alert('In this version, you can only select a maximum of 5 games.');
        }
    }
    function moveGameToAvailable(game) {
        const index = selectedGames.indexOf(game);
        if (index !== -1) {
            selectedGames.splice(index, 1);
            availableGames.push(game);
            availableGames.sort((a, b) => {
                const nameA = a.name.toLowerCase();
                const nameB = b.name.toLowerCase();
                if (nameA < nameB) return -1;
                if (nameA > nameB) return 1;
                return 0;
            });
            displayAvailableGames();
            displaySelectedGames();
        }
    }

    function displaySelectedGames() {
        selectedGamesList.innerHTML = '';
        
        selectedGames.forEach((game) => {
            const li = createGameListItem(game);
            li.addEventListener('click', () => {
                moveGameToAvailable(game);
            });
            selectedGamesList.appendChild(li);
        });
    }

    displayAvailableGames();
    displaySelectedGames();
});