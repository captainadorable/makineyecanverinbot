module.exports = {
  commandName: "ayardosyasıoluştur",
  aliases: [],
  desc: "Sunucun için bir ayarlar dosyası oluştur!",
  usage: "ayardosyasıoluştur",
  permLevel: "ADMINISTRATOR",
  category: "Sunucu Komutları",

  execute: async (client, message, args, database) => {
    let serverModel = await database.models.serverModel;
    let server = await serverModel.findOne({ id: message.guild.id }).exec();
    console.log(server)
    console.log(message.guild.id)
    if (server) {
      message.channel.send("Zaten ayar dosyası oluşturulmuş!");
    } else {
      let newServer = new serverModel({
        id: message.guild.id,
      });

      await newServer.save();

      message.channel.send("Ayar dosyası oluşturuldu!");
    }
  },
};
