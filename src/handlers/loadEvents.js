// File: src/handlers/loadEvents.js
const fs = require('fs').promises;
const path = require('path');
const chalk = require('chalk');

async function loadEvents(client) {
    try {
        const eventDirs = await fs.readdir(path.join(__dirname, '../events'));

        for (const dir of eventDirs) {
            const eventFiles = await fs.readdir(path.join(__dirname, '../events', dir));

            for (const file of eventFiles) {
                const eventPath = path.join(__dirname, '../events', dir, file);
                const event = require(eventPath);

                if (typeof event.execute === 'function') {
                    client.on(event.name, event.execute.bind(null, client));
                    console.log(chalk.green(`* | Loaded event: ${event.name}`));
                } else {
                    console.error(chalk.red(`[${chalk.grey("EVENT")}]${chalk.white(" - ")}Invalid event format in ${file}`));
                }
            }
        }

        console.log(chalk.green('* | All events loaded'));
    } catch (error) {
        console.error(chalk.red(`Error loading events: ${error.message}`));
    }
}

module.exports = loadEvents;