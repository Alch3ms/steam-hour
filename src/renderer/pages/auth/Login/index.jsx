const { ipcRenderer} = window.require('electron');
import { useNavigate } from 'react-router-dom';
import * as Style from '../../../styles/styled/login'
import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react';
import i18n from '../../../../../i18n';

import Logo from '../../../icon/logo'
import SettingsIcon from '../../../icon/settings'
import BackIcon from '../../../icon/back'

import AuthMenu from '../../../components/authMenu';

import languages from '../../../locales/global.json';

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

function SteamGuard() {
    const [enteredCode, setEnteredCode] = useState('');
    const [codeLenght, setCodeLenght] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { t } = useTranslation();
  
    const handleCodeChange = (event) => {
      const codeInUpperCase = event.target.value.toUpperCase();
      setEnteredCode(codeInUpperCase);
      setCodeLenght(codeInUpperCase.length);
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
        <Style.Form>
            <Style.InputContent>
                <Style.Label>{t('EnterSteamGuard').toUpperCase()}</Style.Label>
                <Style.Input
                    type="text"
                    maxLength="5"
                    value={enteredCode}
                    onChange={handleCodeChange}
                    onKeyUp={handleKeyUp}
                />
                {isLoading ? (
                    <Style.LoadingContent>
                        <Style.Loading />
                    </Style.LoadingContent>
                ):(
                    codeLenght === 5 ? (
                        <Style.Submit type="submit">{t('EnterBtn').toUpperCase()}</Style.Submit>
                    ) : (
                        <Style.SubmitDisabled type="button" disabled>{t('EnterBtn').toUpperCase()}</Style.SubmitDisabled>
                    )
                )}
            </Style.InputContent>
        </Style.Form>
      </>
    );
  }
  

export default function login() {
    const { t } = useTranslation();
    const [usernameLength, setUsernameLength] = useState(0);
    const [passwordLength, setPasswordLength] = useState(0);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [showSteamGuard, setShowSteamGuard] = useState(false);
    const [error, setError] = useState('');
    const [openSettings, setOpenSettings] = useState(false);
    const [setVisible, setSetVisible] = useState(1);
    const [lang, setLang] = useState(true);
    const navigate = useNavigate();

    const languageKeys = Object.keys(languages);

    useEffect(() => {
      const storedState = localStorage.getItem('state');
      if (storedState !== null) {
          setSetVisible(parseInt(storedState));
      }
     }, []);

    const handleUsernameChange = (event) => {
        const newUsername = event.target.value;
        setUsernameLength(newUsername.length);
    };

    const handlePasswordChange = (event) => {
        const newPassword = event.target.value;
        setPasswordLength(newPassword.length);
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
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
        setLoadingSubmit(true);
    
        const formData = new FormData(event.target);
        const username = formData.get('username');
        const password = formData.get('password');

        const data = {
          username: username,
          password: password
        };

        ipcRenderer.send('form-data', data);

        const waitForErrorOrProceed = async () => {
          try {
            await new Promise((resolve) => {
              ipcRenderer.on('error-occurred', (event, response) => {
                setError(response);
                resolve(response); 
                setLoadingSubmit(false);
              });

              handleOpenLibrary()
              handleOpenCode()
            })
          } catch (error) {
            console.error(error);
          }
        }

        waitForErrorOrProceed();
    };

    const HandleSettings = () => {
        setOpenSettings(!openSettings);
        console.log(openSettings)
    }

    const handleLang = () => {
      setLang(!lang);
    }

    const handleVisible = () => {
      if (setVisible === 1) {
          setSetVisible(0);
          localStorage.setItem('state', 0);
      } else {
          setSetVisible(1);
          localStorage.setItem('state', 1);
      }
    }

    const changeLang = (key) => {
      handleLang()
      i18n.changeLanguage(key);
    };

    return (
        <>
            <AuthMenu/>
            <Style.Container>
                <Style.Overlay />
                <Style.Background>
                    <picture>
                        <Style.Img src="/bg.jpg" alt="background" />
                    </picture>
                </Style.Background>
                <Style.Content>
                    <Style.LoginContent>
                        <Style.Logo>
                            <Logo/>
                        </Style.Logo>
                        {showSteamGuard ? (
                            <SteamGuard toogleSteamGuard={() => setShowSteamGuard(false)} />
                        ):(
                            <Style.Form onSubmit={handleSubmit}>
                                <Style.InputContent>
                                    <Style.Label>{t('Username').toUpperCase()}</Style.Label>
                                    {error ? (
                                      <Style.InputError
                                          type="text"
                                          name="username"
                                          onChange={handleUsernameChange}
                                      />
                                    ):(
                                      <Style.Input
                                        type="text"
                                        name="username"
                                        onChange={handleUsernameChange}
                                      />
                                    )}
                                </Style.InputContent>
                                <Style.InputContent>
                                    <Style.Label>{t('Password').toUpperCase()}</Style.Label>
                                    {error ? (
                                      <Style.InputError
                                          type={passwordVisible ? 'text' : 'password'}
                                          name="password"
                                          onChange={handlePasswordChange}
                                      />
                                    ):(
                                      <Style.Input 
                                        type={passwordVisible ? 'text' : 'password'}
                                        name="password"
                                        onChange={handlePasswordChange}
                                      />
                                    )}
                                    {passwordLength > 0 && (
                                        <div
                                            className={passwordVisible ? 'icoViewPass' : 'icoOcultPass'}
                                            onClick={togglePasswordVisibility}
                                        />
                                    )}
                                    {error && <Style.Error>{t(`${error}`)}</Style.Error>}
                                </Style.InputContent>
                                {loadingSubmit ? (
                                    <Style.LoadingContent>
                                        <Style.Loading />
                                    </Style.LoadingContent>
                                ):(
                                    usernameLength > 0 && passwordLength > 0 ? (
                                        <Style.Submit type="submit">{t('Login')}</Style.Submit>
                                    ) : (
                                        <Style.SubmitDisabled type="button" disabled>{t('Login')}</Style.SubmitDisabled>
                                    )
                                )}
                            </Style.Form>
                        )}
                    </Style.LoginContent>
                </Style.Content>
                <Style.Settings style={{opacity: openSettings ? '1': '0'}}>
                    {lang ? (
                      <>
                        <Style.SettignTitle>{t('Settings')}:</Style.SettignTitle>
                        <Style.SettingsContent>
                            <Style.Btn onClick={handleLang}>
                              {t('Lang')}
                              <Style.Beta>BETA</Style.Beta>
                            </Style.Btn>
                            <Style.Btn onClick={handleVisible}>
                              {t('Status')}
                              {setVisible === 1 ? (
                                <Style.Visible>{t('Visible')}</Style.Visible>)
                                : (
                                <Style.Invisible>{t('Invisible')}</Style.Invisible>
                              )}
                            </Style.Btn>
                        </Style.SettingsContent>
                    </>
                    ):(
                      <>
                        <Style.SettignTitle onClick={handleLang} style={{cursor: 'pointer', display: 'flex',alignItems: 'center'}}>
                          <BackIcon/>
                          {t('Lang')}
                        </Style.SettignTitle>
                        <Style.SettingsContent>
                          {languageKeys.map((key) => (
                            <Style.Btn onClick={() => changeLang(key)} key={key}>{languages[key].name}</Style.Btn>
                          ))}
                        </Style.SettingsContent>
                      </>
                    )}
                </Style.Settings>
                <Style.SettingsBtn onClick={HandleSettings}>
                    <SettingsIcon/>
                </Style.SettingsBtn>
                <Style.Version>version 0.5.0</Style.Version>
            </Style.Container>
        </>
    );
}