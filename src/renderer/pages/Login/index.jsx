import { useState} from 'react';
const { ipcRenderer, shell } = window.require('electron');
import { useNavigate } from 'react-router-dom';
import '../../styles/login.scss';

function openLibraryWindow() {
  return new Promise(async (resolve, reject) => {
    ipcRenderer.send('libraryWin');
    
    ipcRenderer.once('libraryWin', async (event, response) => {
      try {
        if (response === 'correct') {
          resolve();
        } else if (response === 'userNotLoggedIn') {
          await new Promise((resolve) => setTimeout(resolve, 1000)); 
          openLibraryWindow().then(resolve).catch(reject);
        } else {
          reject(new Error('Error opening the library window'));
        }
      } catch (error) {
        reject(error);
      }
    });
  });
}

function SteamGuard({ toogleSteamGuard }) {
  const [enteredCode, setEnteredCode] = useState('');
  const navigate = useNavigate();

  const handleCodeChange = (event) => {
    const codeInUpperCase = event.target.value.toUpperCase();
    setEnteredCode(codeInUpperCase);
  };

  async function handleOpenLibrary() {
    try {
      await openLibraryWindow();
      navigate('/library');
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmit = () => {
    if (enteredCode) {
      ipcRenderer.send('submit-code', enteredCode);

      handleOpenLibrary()
    }
  };

  const handleKeyUp = (event) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="containerCode">
      <div className="contentSS">
        <div className='closeIco' onClick={toogleSteamGuard}></div>
        <p className="titleCode">Enter the Steam Guard code</p>
        <div className="contentCode">
          <input
            className="inputCode"
            type="text"
            maxLength="5"
            value={enteredCode}
            onChange={handleCodeChange}
            onKeyUp={handleKeyUp}
          />
        </div>
        <div className="btnContentCode">
          <button className="btnCode" onClick={handleSubmit}>
            Enter
          </button>
        </div>
      </div>
    </div>
  );
}

function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordLength, setPasswordLength] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [showSteamGuard, setShowSteamGuard] = useState(false);
  const [ipcResponse, setIpcResponse] = useState(null);
  const navigate = useNavigate();

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const toogleSteamGuard = () => {
    setShowSteamGuard(!showSteamGuard);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPasswordLength(newPassword.length);
  };

  
  async function handleOpenLibrary() {
    try {
      await openLibraryWindow();
      navigate('/library');
    } catch (error) {
      console.error(error);
    }
  }

  function getCodeResponse() {
    return new Promise(async (resolve, reject) => {
      ipcRenderer.send('codeResponse');
      
      ipcRenderer.once('codeResponse', async (event, response) => {
        try {
          if (response === 'correct') {
            console.log(response);
            resolve();
          } else if (response === 'userNotLoggedIn') {
            await new Promise((resolve) => setTimeout(resolve, 1000)); 
            getCodeResponse().then(resolve).catch(reject);
          } else {
            reject(new Error('Error obtaining code response'));
          }
        } catch (error) {
          reject(error);
        }
      });
    });
  }

  async function handleOpenCode() {
    try {
      await getCodeResponse();
      setShowSteamGuard(true);
      console.log('open steam guard')
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const username = formData.get('username');
    const password = formData.get('password');

    if (username.trim() === '' || password.trim() === '') {
      console.log('User name and password cannot be empty');
      return;
    }

    const data = {
      username: username,
      password: password,
      isChecked
    };
    
    ipcRenderer.send('form-data', data);

    handleOpenLibrary()

    handleOpenCode()
  };

  function openGithub() {
    const url = 'https://github.com/evairx/hours-booster';
    shell.openExternal(url);
  }

  return (
    <>
    <main className='container'>
        <div className='github' onClick={openGithub}/>
        <form onSubmit={handleSubmit}>
          <div className="form-content">
            <div>
              <div className="form-x">
                <p className="input-title">Username</p>
                <div className="inputContent">
                  <div className="icoUser"></div>
                  <input type="text" name="username" className="form-input" />
                </div>

                <p className="input-title">Password</p>
                <div className="inputContent">
                  <div className="icoPass"></div>
                  <input
                    type={passwordVisible ? 'text' : 'password'}
                    name="password"
                    className="form-input"
                    onChange={handlePasswordChange}
                  />
                  {passwordLength > 0 && (
                    <div
                      className={passwordVisible ? 'icoViewPass' : 'icoOcultPass'}
                      onClick={togglePasswordVisibility}
                    />
                  )}
                </div>
              </div>

              <div className="contentBox">
                <div className={`checkbox-container ${isChecked ? 'checked' : ''}`} onClick={toggleCheckbox}>
                  <div className="checkbox-mark">✔</div>
                </div>
                <p className="titleRember">Remember me</p>
              </div>
  
              <div className="buttonContent">
                <div className="btnS">
                  <button className="btnLogin" type="submit">
                    <div className="icoLogin"></div> Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </main>
      {showSteamGuard && <SteamGuard toogleSteamGuard={toogleSteamGuard} />}
    </>
  );
}

export default Login;