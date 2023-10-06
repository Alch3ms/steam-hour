const { ipcRenderer } = require('electron');

document.addEventListener('DOMContentLoaded', () => {
  const submitButton = document.getElementById('submitCode');
  const steamGuardCodeInput = document.getElementById('steamGuardCode');

  submitButton.addEventListener('click', () => {
    const enteredCode = steamGuardCodeInput.value;
    if (enteredCode) {
      ipcRenderer.send('submit-code', enteredCode);
    }
  });

  steamGuardCodeInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      const enteredCode = steamGuardCodeInput.value;
      if (enteredCode) {
        ipcRenderer.send('submit-code', enteredCode);
      }
    }
  });
});
