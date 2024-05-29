const fs = require('fs').promises;
const path = require('path');
const chalk = require('chalk');

async function loadCommands(client) {
    try {
        const commandCategories = await fs.readdir(path.join(__dirname, '../commands'));

        for (const category of commandCategories) {
            const commandFiles = await fs.readdir(path.join(__dirname, '../commands', category));
            const files = commandFiles.filter(file => file.endsWith('.js'));

            for (const file of files) {
                const commandPath = path.join(__dirname, '../commands', category, file);
                const command = require(commandPath);

                if (!command.name) {
                    console.log(chalk.white(`[${chalk.red("COMMAND")}]${chalk.white(" - ")}Command at ${chalk.grey(file)} is missing a name`));
                    continue;
                }

                client.commands.set(command.name, command);

                if (command.aliases) {
                    command.aliases.forEach(alias => {
                        client.aliases.set(alias, command.name);
                    });
                }

                console.log(chalk.white(`[${chalk.grey("COMMAND")}]${chalk.white(" - ")}Loaded ${command.name}`));
            }
        }

        console.log(" ");
    } catch (error) {
        console.error(chalk.red(`Error loading commands: ${error.message}`));
    }
}

module.exports = loadCommands;
