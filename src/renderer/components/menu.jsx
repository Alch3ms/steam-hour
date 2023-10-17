const { ipcRenderer } = window.require('electron');
import '../styles/menu.scss';
import React from 'react';

function Menu() {

  function handleMinimizeClick() {
    try {
      ipcRenderer.send('manualMinimize');
    } catch (error) {
      console.error('Error al minimizar la ventana:', error);
    }
  }

  function handleQuitApp() {
    try {
        ipcRenderer.send('manualClose');
      } catch (error) {
        console.error('Error al minimizar la ventana:', error);
      }
  }

  return (
    <nav className="MenuContent">
      <p className="titleMenu">Hours Booster</p>
      <ul className='buttonsUL'>
        <li className="minimizeIco" onClick={handleMinimizeClick}></li>
        <li className='closeWindowIco' onClick={handleQuitApp}> </li>
      </ul>
    </nav>
  );
}

export default Menu;
