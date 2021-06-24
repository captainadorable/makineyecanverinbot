module.exports = {
  commandName: "hesapoluştur",
  aliases: ["createaccount"],
  desc: "Ekonomi komutlarını kullanman için sana bir hesap oluşturur.",
  usage: "hesapoluştur",
  permLevel: null,
  category: "Ekonomi",

  execute: async (client, message, args, database) => {
    let userModel = await database.models.userModel;
    let user = await userModel.findOne({ id: message.author.id }).exec();

    if (user) {
      message.channel.send("Zaten bir hesabın var!");
    } else {
      let user = new userModel({
        id: message.author.id,
        money: 1000,
        job: "İşsiz",
      });

      await user.save();

      message.channel.send("Hesabın oluşturuldu!");
    }
  },
};
