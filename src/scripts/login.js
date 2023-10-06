const { ipcRenderer } = require('electron');

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('myForm');
    const passwordInput = document.getElementById('password');
    const icoViewPass = document.getElementById('icoViewPass');

    icoViewPass.style.display = 'none';

    passwordInput.addEventListener('input', () => {
        if (passwordInput.value.length > 0) {
            icoViewPass.style.display = 'block';
        } else {
            icoViewPass.style.display = 'none';
        }
    });

    icoViewPass.addEventListener('click', () => {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            icoViewPass.classList.add('icoViewPass');
            icoViewPass.classList.remove('icoOcultPass');
        } else {
            passwordInput.type = 'password';
            icoViewPass.classList.add('icoOcultPass');
            icoViewPass.classList.remove('icoViewPass');
        }
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const username = formData.get('username');
        const password = formData.get('password');

        const data = {
            username: username,
            password: password,
    
        };

        ipcRenderer.send('form-data', data);
    });

    ipcRenderer.on('form-data-reply', (event, reply) => {
        console.log('Datos recibidos en el frontend (JSON):');
        console.log(reply);
    });
  
})