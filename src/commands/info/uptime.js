const moment = require('moment');
require('moment-duration-format');

module.exports = {
    name: 'uptime',
    description: 'Uptime command',
    async execute(client, target, context, msg, self) {
        if (self) return;

        const botUptime = client.readyAt ? Date.now() - client.readyAt : null;
        const duration = moment.duration(botUptime).format('Y [years] D [days], H [hours], m [minutes], s [seconds]');
        
        client.say(target, `Bot uptime: ${duration}`);
    }
};
