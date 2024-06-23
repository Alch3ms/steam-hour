import * as Style from '../styles/styled/authMenu'
const { ipcRenderer } = window.require('electron');

export default function AuthMenu() {

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
        <Style.Menu>
            <ul>
                <Style.Minimize onClick={handleMinimizeClick}/>
                <Style.CloseWindow onClick={handleQuitApp}/>
            </ul>
        </Style.Menu>
    )
}