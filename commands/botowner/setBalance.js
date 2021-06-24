module.exports = {
  commandName: "setBalance",
  aliases: ['setbalance', 'bakiyeayarla'],
  desc: "Kullanıcının bakiyesini değiştirir. ",
  usage: "setBalance <@kullanıcı> <miktar>",
  permLevel: "BOT_OWNER",
  category: "",

  execute: async (client, message, args, database) => {
    let mention = message.mentions.members.first();
    let amount = args[1];
    if (!mention) return message.reply("Bir kullanıcı belirt!");
    if (!amount) return message.reply("Bir miktar belirt!");

    let userModel = await database.models.userModel;
    let user = await userModel.findOne({ id: mention.id }).exec();
    if (!user) return message.reply("Bu kullanıcının hesabı yok!");

    await userModel.update({ id: mention.id }, { money: amount });
    message.reply("Kullanıcının bakiyesi güncellendi!");
  },
};
