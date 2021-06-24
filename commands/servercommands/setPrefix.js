module.exports = {
  commandName: "prefix",
  aliases: [],
  desc: "Botun prefixini değiştir!",
  usage: "prefix <prefix>",
  permLevel: "MANAGE_USERS",
  category: "Sunucu Komutları",

  execute: async (client, message, args, database) => {
    let prefix = args[0];
    if (!prefix) return message.reply('Lütfen bir prefix gir! Doğru kullanım: m!prefix <prefix>');
    if (prefix.length > 10) return message.reply("Prefix uzunluğu 10'dan küçük olmalı!")

    let serverModel = await database.models.serverModel;
    let server = await serverModel.findOne({ id: message.guild.id }).exec();
    if (!server)
      return message.reply(
        "Bu sunucuya ait bir ayar dosyası bulamadım. Oluşturmak için: m!ayardosyasıoluştur"
      );

    await serverModel.update({ id: message.guild.id }, { prefix: prefix });
    message.reply('Prefix güncellendi! Yeni prefix: **' + prefix + '** ')
  },
};
