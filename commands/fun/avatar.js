const Discord = require('discord.js')
module.exports = {
    commandName: 'avatar',
    aliases: [],
    desc: 'Avatarını görmek ister misin?',
    usage: 'avatar <@kullanıcı>',
    permLevel: null,
    category: 'Eğlence',
    
    execute: async (client, message, args) => {
        const user = message.mentions.users.first() || message.author        
        let embed = new Discord.MessageEmbed()
            .setAuthor('Avatar')
            .setImage(user.displayAvatarURL({ dynamic: true, size: 4096 }))
            .setColor('RANDOM')
            .setFooter(`${user.username} kullanıcısının avatarı`)
        message.channel.send(embed)
    }
}