const { ipcRenderer} = window.require('electron');
import { useNavigate } from 'react-router-dom';
import * as Style from '../../../styles/styled/login'
import { useTranslation } from 'react-i18next'
import { useState } from 'react';

import Logo from '../../../icon/logo'
import SettingsIcon from '../../../icon/settings'

import AuthMenu from '../../../components/authMenu';

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
    const navigate = useNavigate();

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

        ipcRenderer.on('get-data', (event, response) => {
            if (response === true) {
                handleOpenLibrary()
                handleOpenCode()
                console.log('correcto')
            }
        });
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
                                    <Style.Input
                                        type="text"
                                        name="username"
                                        onChange={handleUsernameChange}
                                    />
                                </Style.InputContent>
                                <Style.InputContent>
                                    <Style.Label>{t('Password').toUpperCase()}</Style.Label>
                                    <Style.Input 
                                        type={passwordVisible ? 'text' : 'password'}
                                        name="password"
                                        onChange={handlePasswordChange}
                                    />
                                    {passwordLength > 0 && (
                                        <div
                                            className={passwordVisible ? 'icoViewPass' : 'icoOcultPass'}
                                            onClick={togglePasswordVisibility}
                                        />
                                    )}
                                </Style.InputContent>
                                {loadingSubmit ? (
                                    <Style.LoadingContent>
                                        <Style.Loading />
                                    </Style.LoadingContent>
                                ):(
                                    usernameLength > 0 && passwordLength > 0 ? (
                                        <Style.Submit type="submit">{t('Login').toUpperCase()}</Style.Submit>
                                    ) : (
                                        <Style.SubmitDisabled type="button" disabled>{t('Login').toUpperCase()}</Style.SubmitDisabled>
                                    )
                                )}
                            </Style.Form>
                        )}
                    </Style.LoginContent>
                </Style.Content>
                <Style.SettingsBtn>
                    <SettingsIcon/>
                </Style.SettingsBtn>
                <Style.Version>version 0.5.0</Style.Version>
            </Style.Container>
        </>
    );
}