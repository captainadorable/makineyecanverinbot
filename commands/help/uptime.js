const ms = require('ms');

module.exports = {
    commandName: 'uptime',
    aliases: [],
    desc: 'Botun ne zamandan beri açık olduğunu öğren!',
    usage: 'uptime',
    permLevel: null,
    category: 'Yardım',
    
    execute: async (client, message, args) => {
        message.channel.send(`Galiba \`${ms(client.uptime, { long: true })}\` oldu!`);
    }
}