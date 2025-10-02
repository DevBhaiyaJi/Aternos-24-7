const mineflayer = require('mineflayer');
const http = require('http');

// Fake HTTP server bind for Render free Web Service
http.createServer((req, res) => {
  res.end('Ramfal bot running');
}).listen(process.env.PORT || 3000);

const SERVER_HOST = process.env.SERVER_HOST || 'your.aternos.ip';
const SERVER_PORT = parseInt(process.env.SERVER_PORT || '25565', 10);
const AUTHME_PASSWORD = process.env.AUTHME_PASSWORD || '123';

function createBot() {
  const bot = mineflayer.createBot({
    host: SERVER_HOST,
    port: SERVER_PORT,
    username: 'Ramfal',
    version: '1.12.2'
  });

  bot.on('login', () => {
    console.log('[Ramfal] Connected ✅');
  });

  bot.on('spawn', () => {
    console.log('[Ramfal] Spawned in world');

    // AuthMe register command
    setTimeout(() => {
      bot.chat(`/register ${AUTHME_PASSWORD} ${AUTHME_PASSWORD}`);
    }, 2000);

    // AuthMe login fallback
    setTimeout(() => {
      bot.chat(`/login ${AUTHME_PASSWORD}`);
    }, 4000);

    // Sneak + Jump loop
    setInterval(() => {
      bot.setControlState('sneak', true);
      bot.setControlState('jump', true);

      setTimeout(() => {
        bot.setControlState('sneak', false);
        bot.setControlState('jump', false);
      }, 500);
    }, 2000);
  });

  bot.on('end', () => {
    console.log('[Ramfal] Disconnected, reconnecting...');
    setTimeout(createBot, 5000);
  });

  bot.on('kicked', (reason) => {
    console.log('[Ramfal] Kicked:', reason);
  });

  bot.on('error', (err) => {
    console.log('[Ramfal] Error:', err);
  });
}

createBot();
