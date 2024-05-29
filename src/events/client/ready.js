const chalk = require("chalk")

module.exports = {
    name: 'connected',
    execute(client) {
        client.readyAt = Date.now();
        console.log(chalk.red(`* | Bot connected to ${client.username}!`));
    }
};
