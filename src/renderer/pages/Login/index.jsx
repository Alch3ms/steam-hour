import { useState , useEffect} from 'react';
const { ipcRenderer} = window.require('electron');
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as Theme from './LoginUI'

import Version from  '../../components/version'
import Github from '../../components/github';
import Sponsor from '../../components/sponsor'

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

function SteamGuard({ toogleSteamGuard }) {
  const [enteredCode, setEnteredCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

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
      setIsLoading(true);
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
    <>
    {isLoading ?
      <Theme.Code>
        <main className="contentCode">
          <div className="main">
            <main>
              <Theme.LoadContent>
                <Theme.Loading/>
              </Theme.LoadContent>
              <p className="titleLoad">{t('ValidatingSteam')}</p>
            </main>
          </div>
        </main>
      </Theme.Code>
      :
      <>
      <Theme.Code>
        <main className="contentCode">
          <div className='closeIco' onClick={toogleSteamGuard}></div>
          <div className="main">
            <div>
              <p className="titleCode">{t('EnterSteamGuard')}</p>
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
                  {t('EnterBtn')}
                </button>
              </div>
            </div>
          </div>
        </main>
      </Theme.Code>
      <Theme.Overlay/>
      </>}
    </>
  );
}

function LoginForm() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordLength, setPasswordLength] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [showSteamGuard, setShowSteamGuard] = useState(false);
  const { t } = useTranslation();
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

  return (
    <>
    <Theme.Container>
        <form onSubmit={handleSubmit}>
          <div className="form-content">
            <div>
              <div className="form-x">
                <p className="input-title">{t('Username')}</p>
                <div className="inputContent">
                  <div className="icoUser"></div>
                  <input type="text" name="username" className="form-input" />
                </div>

                <p className="input-title">{t('Password')}</p>
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
                <p className="titleRember">{t('Remember')}</p>
              </div>
                    
            {showSteamGuard ? undefined
            :
              <div className="buttonContent">
                <div className="btnS">
                  <button className="btnLogin" type="submit">
                    {t('Login')}
                  </button>
                </div>
              </div>
            }
            </div>
          </div>
        </form>
      </Theme.Container>
      {showSteamGuard && <SteamGuard toogleSteamGuard={toogleSteamGuard}/>}
    </>
  );
}

function Select({ accountData  }) {
  const [accountsData, setAccountsData] = useState([]);
  const [selectedUsername, setSelectedUsername] = useState('');
  const [selectedPassword, setSelectedPassword] = useState('');
  const [showSteamGuard, setShowSteamGuard] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showAddContainer, setShowAddContainer] = useState(true);
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    setAccountsData(accountData );

    if (accountData .length === 3) {
      setShowAddContainer(false);
    } else {
      setShowAddContainer(true);
    }
  }, []);

  const toogleSteamGuard = () => {
    setShowSteamGuard(!showSteamGuard);
  };

  async function handleOpenCode() {
    try {
      await getCodeResponse();
      setIsLoading(false);
      setShowSteamGuard(true);
      console.log('open steam guard')
    } catch (error) {
      console.error(error);
    }
  }

  async function handleOpenLibrary() {
    try {
      setIsLoading(true);
      await openLibraryWindow();
      navigate('/library');
    } catch (error) {
      console.error(error);
    }
  }

  const toggleUser = (account) => {
    setSelectedUsername(account.username);
    setSelectedPassword(account.password);

    const data = {
      username: account.username,
      password: account.password,
    };

    console.log(data)

    ipcRenderer.send('form-data', data);
    
    handleOpenLibrary();

    handleOpenCode()
  };

  const toggleAddUser = () => {
    setShowLoginForm(!showLoginForm);
  };

  function toggleOptions(account) {
    setShowOptions(!showOptions);
    setSelectedAccount(account);
  }

  function OptionsUser({ account }) {

    const deleteAccount = () => {
      const updatedAccounts = accountData.filter((storedAccount) => storedAccount.username !== account.username);
    
      setAccountsData(updatedAccounts);
    
      localStorage.setItem('accounts', JSON.stringify(updatedAccounts));
    
      setShowAddContainer(updatedAccounts.length < 3);

      toggleOptions(null);
    };

    return (
      <>
        <Theme.ContentOptions>
          <div className='closeIcoOptions' onClick={() => toggleOptions(null)}></div>
          <h1>{t('Options')}</h1>
          <div className='deleteContainer' onClick={deleteAccount}>
            <div className='deleteIco'></div>
            <p className='deleteTitle'>{t('DeleteUser')}</p>
          </div>
        </Theme.ContentOptions>
        <Theme.Overlay/>
      </>
    );
  }

  return (
    <>
      {showLoginForm ? (
        <>
          <Theme.Back onClick={toggleAddUser}>
            <div className="backIco"/>
            {t('Back')}
          </Theme.Back>
          <LoginForm />
        </>
      ) : isLoading ? (
        <Theme.ContainerLoad>
          <main>
              <Theme.LoadContent>
                <Theme.Loading/>
              </Theme.LoadContent>
            <p className="titleLoad">{t('Connecting') }</p>
          </main>
        </Theme.ContainerLoad>
      ) : (
        <Theme.ContainerSelect>
          {accountsData.map((account, index) => (
            <main key={index}>
              <div className="posterContainer">
                <img
                  src={account.avatar_url_full}
                  className="posterSelect"
                  draggable="false"
                  onClick={() => toggleUser(account)}
                />
                <div className="settingsContent" onClick={() => toggleOptions(account)}>
                  <div className="settingsIco" />
                </div>
              </div>
              <p className="nameUser">{account.player_name}</p>
              {showOptions && selectedAccount === account && <OptionsUser account={selectedAccount} />}
            </main>
          ))}
          {showAddContainer && (
            <main>
              <div className="addContainer" onClick={toggleAddUser}>
                <div className="addIco" />
              </div>
              <p className="addUser">
                {t('AddUser')}
              </p>
            </main>
            )}
          {showSteamGuard && <SteamGuard toogleSteamGuard={toogleSteamGuard} />}
        </Theme.ContainerSelect>
      )}
    </>
  );
}

function Login() {
  const accountData = JSON.parse(localStorage.getItem('accounts')) || [];

  return !accountData  || accountData .length === 0 ? (
    <>
      <LoginForm />
      <Github/>
      <Version/>
    </>
  ) : (
    <>
      <Select accountData={accountData}/>
      <Github/>
      <Version/>
      <Sponsor/>
    </>
  );
}

export default Login;