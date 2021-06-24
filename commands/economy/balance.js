module.exports = {
    commandName: "bakiye",
    aliases: ['money', 'balance'],
    desc: "Mevcut bakiyeyi gösterir.",
    usage: "bakiye <@kullanıcı>",
    permLevel: null,
    category: "Ekonomi",
  
    execute: async (client, message, args, database) => {
      let mention = message.mentions.members.first() || message.author

      let userModel = await database.models.userModel;
      let user = await userModel.findOne({ id: mention.id }).exec();
  
      if (user) {
        message.channel.send(`${mention}, kullanıcısının bakiyesi: ${user.money}`);
      } else {
        message.channel.send("Bu kullanıcının hesabı yok!")
      }
    },
  };
  