const Discord = require("discord.js")

module.exports = {
    commandName: 'yardım',
    aliases: ['yardım', 'yardim', 'help'],
    desc: 'Komutlar hakkında bilgi sahibi olabilirsin!',
    usage: 'yardım',
    permLevel: null,
    category: 'Yardım',
    
    execute: (client, message, args) => {
        if (args[0] && client.commands.has(args[0])) {
            let cmd = client.commands.get(args[0])

            let aliases = "";
            cmd.aliases.forEach(alias => {
                aliases += `\`${alias}\` `
            })

            let text = {
                commandName: cmd.commandName,
                aliases: aliases ? aliases : 'Yok',
                permLevel: cmd.permLevel ? cmd.permLevel : 'Herkes',
                desc: cmd.desc,
                usage: cmd.usage
            }
            let embed = new Discord.MessageEmbed()
                .setTitle(text.commandName)
                .setDescription(`**Açıklama**: ${text.desc}\n**Kullanım**: ${text.usage}\n**Farklı kullanımlar**: ${text.aliases}\n**Yetki**: ${text.permLevel}`)
                .setColor('RANDOM')
            message.channel.send(embed)
        }
        else {
            let text = {
                help : '',
                economy: '',
                moderation: '',
                fun: '',
                servercommands: ''
            }
            
            client.commands.filter(cmd => cmd.category == 'Yardım').forEach(command => {
                text.help += ` \`${command.commandName}\` `
            })
            client.commands.filter(cmd => cmd.category == 'Ekonomi').forEach(command => {
                text.economy += ` \`${command.commandName}\` `
            })
            client.commands.filter(cmd => cmd.category == 'Moderasyon').forEach(command => {
                text.moderation += ` \`${command.commandName}\` `
            })
            client.commands.filter(cmd => cmd.category == 'Eğlence').forEach(command => {
                text.fun += ` \`${command.commandName}\` `
            })
            client.commands.filter(cmd => cmd.category == 'Sunucu Komutları').forEach(command => {
                text.servercommands += ` \`${command.commandName}\` `
            })

            let embed = new Discord.MessageEmbed()
                .setTitle('Yardım')
                .setDescription('Ayrıntılı bilgi için: m!yardım <komut-adı>')
                .addField('Yardım', text.help)
                .addField('Ekonomi', text.economy)
                .addField('Moderasyon', text.moderation)
                .addField('Eğlence', text.fun)
                .addField('Sunucu Komutları', text.servercommands)
                .setColor('RANDOM')
            message.channel.send(embed)
        }
    }
}