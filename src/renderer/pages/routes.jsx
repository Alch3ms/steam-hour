import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
const { ipcRenderer } = window.require('electron');
import i18n from '../../../i18n';

import Menu from '../components/menu';
import Login from './auth/Login';
import Library from './Library';
import Boosting from './boosting';

function routes() {

  /*useEffect(() => {
    ipcRenderer.send('getOsLanguage');
  
    ipcRenderer.on('osLanguage', (event, osLanguage) => {
      let newLanguage = 'en'; 

      console.log('lng: ' + osLanguage)
  
      if (osLanguage.startsWith('es') || osLanguage.startsWith('es-')) {
        newLanguage = 'es';
      } else if (osLanguage.startsWith('ru')) {
        newLanguage = 'ru';
      } else if (osLanguage.startsWith('ja')) {
        newLanguage = 'ja';
      }
  
      i18n.changeLanguage(newLanguage);
    });
  }, []);*/

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/library" element={<Library />} />
        <Route path="/boosting" element={<Boosting />} />
      </Routes>
    </>
  );
}

export default routes;