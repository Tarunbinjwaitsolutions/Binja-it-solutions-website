import os from 'os';
import { spawn } from 'child_process';

function getLocalIPv4Address() {
  const interfaces = os.networkInterfaces();
  
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      // Find the first non-internal IPv4 address
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

const realIp = getLocalIPv4Address();

console.log('\n\x1b[36m%s\x1b[0m', '=========================================');
console.log('\x1b[32m%s\x1b[0m', `  Network:       http://${realIp}:3000`);
console.log('\x1b[36m%s\x1b[0m', '=========================================\n');

// Spawn the next dev server
const nextProcess = spawn('npx', ['next', 'dev', '-H', '0.0.0.0'], {
  stdio: 'inherit', // Stream all output directly to terminal
  shell: true
});

nextProcess.on('close', (code) => {
  process.exit(code);
});
