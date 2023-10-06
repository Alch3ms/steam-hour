const { app, BrowserWindow, ipcMain, shell, globalShortcut, dialog } = require('electron');
const steamUser = require('steam-user');
const packageJson = require('./package.json');
const path = require('path');
const fs = require('fs');
const https = require('https');
const express = require('express');

const ico = path.join(__dirname, 'public', 'favicon.ico');
const template = path.join(__dirname,'src', 'templates');
const index = 'index.html';

const appExpress = express();
appExpress.use(express.json());

const PORT = 7000;
appExpress.listen(PORT, function() {
  console.log(`Open: http://localhost:${PORT}`);
});

let mainWindow;
let secondWindow;

app.name = 'Hours Booster';

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 250,
    height: 300,
    resizable: false,
    fullscreenable: false,
    icon: ico,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    title: 'Hours Booster',
    frame: false,
  });

  mainWindow.loadFile(`${template}/Load/${index}`);

  setTimeout(() => {
    const versionUrl = 'https://raw.githubusercontent.com/evairx/hours-booster/main/version.json';

    fetch(versionUrl)
      .then((response) => response.json())
      .then((remoteVersion) => {
        if (remoteVersion.version !== packageJson.version) {
          mainWindow.loadFile(`${template}/Update/${index}`);
        } else {
          mainWindow.close();
          if (secondWindow) {
            secondWindow.close();
          }
          createSecondWindow();
        }
      })
      .catch((error) => {
        console.error('Error al verificar la versión remota:', error);
      });
  }, 1500);
}

function createSecondWindow() {
  secondWindow = new BrowserWindow({
    width: 600,
    height: 350,
    resizable: false,
    fullscreenable: false,
    autoHideMenuBar: true,
    icon: ico,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    title: 'Hours Booster',
  });

  secondWindow.loadFile(`${template}/Login/${index}`);
}

app.whenReady().then(() => {
  createMainWindow();

  globalShortcut.register('Ctrl+Shift+I', () => {
    // Handle global shortcut
  });

  ipcMain.on('form-data', (event, data) => {
    handleFormData(event, data);
  });

  ipcMain.on('start-update', () => {
    startUpdater();
  });
});

function handleFormData(event, data) {
  const { username, password } = data;

  if (!username || !password) {
    event.reply('form-data-reply', { success: false, message: 'Please complete the fields.' });
    return;
  }

  const user = new steamUser();

  user.on('error', handleSteamError);

  user.logOn({ accountName: username, password: password });

  user.on('steamGuard', openSteamGuardCodeWindow);

  function openSteamGuardCodeWindow(domain, callback) {
    createSteamGuardCodeWindow()

    ipcMain.on('submit-code', (event, enteredCode) => {
  
      callback(enteredCode);

      guardcode.close();
    });
  }

  user.on('loggedOn', () => {
    if (user.steamID != null) {
      const steamid = user.steamID;

      if (secondWindow) {
        secondWindow.close();
      }

      let info;

      user.getPersonas([steamid], async function (err, personas) {
        if (err) {
          console.log(err.message);
          res.status(500).send('Error al obtener la información del usuario');
        } else {
          info = personas[steamid];
          const player = info.player_name;

          console.log('Successfully logged on - ' + player);
        }
      });

      appExpress.get('/', async (req, res) => {
        try {
          if (info) { 
            res.json(info);
          } else {
            res.status(404).send('Info no disponible'); 
          }
        } catch (error) {
          console.error(error);
          res.status(500).send('Error del servidor');
        }
      })

      let games;

      user.getUserOwnedApps([steamid], function (err, response) {
        if (err) {
          console.log(err.message);
        } else {
          games = response;
        }
      });

      appExpress.get('/games', async (req, res) => {
        try {
          if (games) {
            res.json(games);
          } else {
            res.status(404).send('game no disponible');
          }
        } catch (error) {
          console.error(error);
          res.status(500).send('Error del servidor');
        }
      })

      createLibraryWindow();

      let isBoosting = false;

      ipcMain.on('start-boost', (event, selectedGameIds) => {
        if (isBoosting) {
          return;
        }

        isBoosting = true;

        console.log(selectedGameIds);

        if (libraryWindow) {
          libraryWindow.close();
        }

        createRunningWindow();

        user.setPersona(1);
        user.gamesPlayed(selectedGameIds);
      });

      event.reply('form-data-reply', { success: true, message: 'Inicio de sesión exitoso' });
    } else {
      event.reply('form-data-reply', { success: false, message: 'Inicio de sesión fallido' });
    }
  });
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

function startUpdater() {
  setTimeout(() => {
    const downloadDir = app.getPath('userData');
    const downloadUrl = 'https://raw.githubusercontent.com/evairx/hours-booster/main/updater.bat';

    https.get(downloadUrl, (response) => {
      if (response.statusCode === 200) {
        let updaterCode = '';

        response.on('data', (chunk) => {
          updaterCode += chunk;
        });

        response.on('end', () => {
          const batFilePath = path.join(downloadDir, 'update.bat');

          fs.writeFile(batFilePath, updaterCode, (err) => {
            if (err) {
              console.error('Error al crear el archivo .bat:', err);
            } else {
              shell.openPath(batFilePath).then(() => {
                app.quit();
              }).catch((openError) => {
                console.error('Error al abrir el archivo .bat:', openError);
                app.quit();
              });
            }
          });
        });
      } else {
        console.error('Error al descargar el archivo. Código de estado:', response.statusCode);
      }
    }).on('error', (error) => {
      console.error('Error de conexión:', error.message);
    });
  }, 5500);
}

function createLibraryWindow() {
  libraryWindow = new BrowserWindow({
    width: 790,
    height: 550,
    resizable: false,
    fullscreenable: false,
    autoHideMenuBar: true,
    icon: ico,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    title: 'Hours Booster | Library',
  });

  libraryWindow.loadFile(`${template}/Library/${index}`);
}

function createRunningWindow() {
   runningWindow = new BrowserWindow({
    width: 400,
    height: 200,
    resizable: false,
    fullscreenable: false,
    autoHideMenuBar: true,
    icon: ico,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    title: 'Hours Booster',
  });

  runningWindow.loadFile(`${template}/Boosting/${index}`);;
}

function createSteamGuardCodeWindow() {
  guardcode = new BrowserWindow({
    width: 400,
    height: 250,
    resizable: false,
    fullscreenable: false,
    autoHideMenuBar: true,
    icon: ico,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    title: 'Hours Booster',
  });

  guardcode.loadFile(`${template}/GuardCode/${index}`);;
}

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
