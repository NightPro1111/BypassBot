const { log } = require("../../functions");
const { ActivityType  } = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');

module.exports = {
    event: 'ready',
    once: true,
    /**
     * 
     * @param {ExtendedClient} _ 
     * @param {import('discord.js').Client<true>} client 
     * @returns 
     */
    run: (_, client) => {
        setInterval(() => {
            client.user.setPresence({
                activities: [{ name: `/bypass | ${client.ws.ping} ms`, type: ActivityType.Playing }],
                status: 'idle',
            });
        }, 1000);
        
        log('Logged in as: ' + client.user.tag, 'done');

    }
};