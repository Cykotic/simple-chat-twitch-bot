module.exports = {
    name: 'message',
    async execute(client, channel, tags, message, self) {

        if (self || !message.startsWith(process.env.PREFIX)) return;

        const args = message.slice(process.env.PREFIX.length).trim().split(/ +/);
        const cmd = args.shift().toLowerCase();

        if (cmd.length === 0) return;

        const command = client.commands.get(cmd) || client.commands.find(c => c.aliases?.includes(cmd));
        if (!command) return;

        try {
            await command.execute(client, channel, tags, message, self);
        } catch (error) {
            console.error(`Error executing command ${cmd}: ${error.message}`);
        }
    }
};
