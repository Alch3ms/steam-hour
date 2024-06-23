const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron');
const steamUser = require('steam-user');
const packageJson = require('../../package.json');
const config = require('../../config')

let mainWindow;

app.name = 'Hours Booster';

const url = config.VITE_DEV_SERVER_UR

function createMainWindow() {

    mainWindow =  new BrowserWindow({
      width: 1280,
      height: 720,
      resizable: false,
      fullscreenable: false,
      frame: false,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
      title: 'Hours Booster',
    });

    mainWindow.loadURL(url)

    ipcMain.on('manualMinimize', () => {
      mainWindow.minimize();
    });

    ipcMain.on('manualClose', () => {
      app.quit();
    });
}

app.whenReady().then(() => {
  createMainWindow();

  const osLanguage = app.getLocale();

  ipcMain.on('getOsLanguage', (event) => {
    event.sender.send('osLanguage', osLanguage);
  });
  
  ipcMain.on('form-data', (event, data) => {
      handleFormData(data);
      event.sender.send('get-data', true);
  });
  
  app.on('window-all-closed', () => {
    app.quit();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});

let userLoggedIn = false;
let steamGuardIn = false;

ipcMain.on('libraryWin', async (event) => {
  if (!userLoggedIn) {
    event.sender.send('libraryWin', 'userNotLoggedIn');
    return;
  }
  event.sender.send('libraryWin', 'correct');
});


ipcMain.on('codeResponse', (event) => {
  if (!steamGuardIn) {
    event.sender.send('codeResponse', 'userNotLoggedIn');
    return;
  }
  event.sender.send('codeResponse', 'correct');
})

function handleFormData(data) {
  const { username, password } = data;

  if (!username || !password) {
    console.log('user and pass empty')
    return;
  }

  const user = new steamUser();

  user.on('error', handleSteamError);

  user.logOn({ accountName: username, password: password });

  user.on('steamGuard', openSteamGuardCodeWindow);

  function openSteamGuardCodeWindow(domain, callback) {
    console.log('open steamGuardCodeWindow')
    steamGuardIn = true;
    console.log(steamGuardIn)
    ipcMain.on('submit-code', (event, enteredCode) => {
      callback(enteredCode);
    });
  }

  user.on('loggedOn', () => {
     if (user.steamID != null) { 
      const steamid = user.steamID;

      let info;
      let infoLevel;
      let games;
      let infoSent = false;
      let levelSent = false;
      let gamesSent = false;


      ipcMain.on('dataInfo', (event) => {
        if (!infoSent && !levelSent && !gamesSent) {
          event.sender.send('dataInfo', 'userNotLoggedIn');
        } else {
          event.sender.send('dataInfo', { info, infoLevel, games, data});
        }
      });
      
      user.getPersonas([steamid], async function (err, personas) {
        if (err) {
          console.log(err.message);
        } else {
          info = personas[steamid];
          const player = info.player_name;
          infoSent = true;
          console.log('Successfully logged on - ' + player);
        }
      });

      user.getSteamLevels([steamid], function(err, users) {
        if (err) {
          console.log(err.message);
        } else {
          infoLevel = users
          levelSent = true;
        }
      })

      user.getUserOwnedApps([steamid], function (err, response) {
        if (err) {
          console.log(err.message);
        } else {
          games = response;
          gamesSent = true;
        }
      });

      userLoggedIn = true;

      ipcMain.on('start-boost', (event, selectedGameIds) => {
        console.log(selectedGameIds);

        user.setPersona(1);

        user.gamesPlayed(selectedGameIds, () => {
          event.sender.send('boost-started');
        });
      });
      
      ipcMain.on('stop-boost', (event) => {
        console.log('stopped boost');
        user.setPersona(1);
      
        user.gamesPlayed([], () => {
          event.sender.send('boost-stopped');
        });
      });
     }
  })
}

function handleSteamError(err) {
  const errorMessages = {
    'InvalidPassword': {
      title: 'Invalid Password',
      message: 'Your Steam password is incorrect, please try again.',
    },
    'RateLimitExceeded': {
      title: 'Rate Limit Exceeded',
      message: "Hey hey, calm down speedy, are you in a hurry? don't you see that because of you Steam has blocked your IP for a while? just go take a break and come back later.",
    },
  };

  const { title, message } = errorMessages[err.message] || errorMessages['InvalidPassword'];

  dialog.showErrorBox(title, message);
}