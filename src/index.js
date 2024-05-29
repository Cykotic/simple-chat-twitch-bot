const tmi = require('tmi.js');
require('dotenv').config();

const loadCommands = require('./handlers/loadCommands');
const loadEvents = require('./handlers/loadEvents');

const opts = {
    options: {
        debug: false
    },
    identity: {
        username: process.env.BOT_USERNAME,
        password: process.env.OAUTH_TOKEN
    },
    channels: [
        process.env.CHANNEL_NAME
    ]
};

const client = new tmi.Client(opts);
client.commands = new Map();
client.aliases = new Map();

(async () => {
    try {
        await loadCommands(client);
        await loadEvents(client);
        await client.connect();
        console.log(`* | Connected to ${opts.channels}`);
    } catch (error) {
        console.error(`Error initializing bot: ${error.message}`);
    }
})();