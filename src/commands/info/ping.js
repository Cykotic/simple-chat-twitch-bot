module.exports = {
    name: 'ping',
    description: 'Ping command',
    execute(client, target, context, msg, self) {
        if (self) return; // Ignore messages from the bot
        client.say(target, 'Pong!');
    }
};