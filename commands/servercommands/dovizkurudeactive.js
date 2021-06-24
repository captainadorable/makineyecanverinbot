module.exports = {
    commandName: 'dövizkuru-kapat',
    aliases: [],
    desc: 'Döviz kuru özelliğini kapatır!',
    usage: 'dövizkuru-kapat',
    permLevel: 'MANAGE_CHANNELS',
    category: 'Sunucu Komutları',
    
    execute: async (client, message, args, database) => {
        let serverModel = await database.models.serverModel;
        let server = await serverModel.findOne({ id: message.guild.id }).exec();
        if (!server) return message.reply("Bu sunucuya ait bir ayar dosyası bulamadım. Oluşturmak için: m!ayardosyasıoluştur");

        if(server.currencyexchange == '') return message.reply("Zaten bu özellik sunucuda kapalı!")

        await serverModel.update({ id: message.guild.id }, { currencyexchange: '' })
        message.reply('Özellik başarı ile kapatıldı!')
    }
}