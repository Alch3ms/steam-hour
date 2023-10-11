const { spawn } = require('child_process');
const path = require('path');

const electronProcess = spawn('electron', ['main'], {
  cwd: path.join(__dirname, '../src/'), 
  shell: true,
  stdio: 'inherit',
});


const viteProcess = spawn('vite', {
  cwd: path.join(__dirname, '../'), 
  shell: true,
  stdio: 'inherit',
});

process.on('SIGINT', () => {
  viteProcess.kill();
  electronProcess.kill();
});