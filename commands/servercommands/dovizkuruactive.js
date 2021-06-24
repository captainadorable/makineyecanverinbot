module.exports = {
    commandName: 'dövizkuru-aç',
    aliases: [],
    desc: 'Döviz kuru hakkında düzenli olarak bilgi almak için bu özelliği aktif et!',
    usage: 'dövizkuru-aç <kanal-ismi>',
    permLevel: 'MANAGE_CHANNELS',
    category: 'Sunucu Komutları',
    
    execute: async (client, message, args, database) => {
        let channelName = args[0]
        let channel = message.guild.channels.cache.find(channel => channel.name == channelName)
        if(!channel) return message.reply(`\`${channelName}\` isminde bir kanal bulamadım!`)

        let serverModel = await database.models.serverModel;
        let server = await serverModel.findOne({ id: message.guild.id }).exec();
        if (!server) return message.reply("Bu sunucuya ait bir ayar dosyası bulamadım. Oluşturmak için: m!ayardosyasıoluştur");

        if(server.currencyexchange != '') return message.reply("Zaten bu özellik sunucuda aktif!")

        await serverModel.update({ id: message.guild.id }, { currencyexchange: channel.id })
        message.reply('Özellik başarı ile aktif edildi!')
    }
}