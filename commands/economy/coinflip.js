module.exports = {
  commandName: "yazıtura",
  aliases: ["cf", "coinflip", "yt"],
  desc: "Bir yazı tura at ve paranı ikiye katla!",
  usage: "yazıtura <yazı | tura> <miktar>",
  permLevel: null,
  category: "Ekonomi",

  execute: async (client, message, args, database) => {
    let option = args[0];
    let amount = args[1];

    if (!option || !amount || isNaN(amount) || amount <= 0) {
      if (!option) return message.reply('Lütfen geçerli bir seçenek belirt! `yazı` yada `tura`')
      if (!amount) return message.reply('Lütfen bir miktar belirt! Doğru kullanım `yazıtura <yazı | tura> <miktar>`')
      if (isNaN(amount)) return message.reply('Lütfen geçerli bir miktar belirt!')
      if (amount <= 0) return message.reply("Lütfen 0'dan büyük bir miktar belirt!")
    }
    
    if (option.toLowerCase() == "yazı" || option.toLowerCase() == "tura") {

      let userModel = await database.models.userModel;
      let user = await userModel.findOne({ id: message.author.id }).exec();

      if (!user || user.money < amount) {
        if (!user) return message.reply("Bu komutu kullanmak için bir hesap oluşturmalısın!");
        if (user.money < amount) return message.reply(`Bakiye yetersiz! Bakiyen: ${user.money}`);
      } 
      else {
        let options = ["yazı", "tura"];
        let random = options[Math.floor(Math.random() * options.length)];

        if (random == option) {
          let msg = await message.channel.send(`Para dönüyor!`);
          setTimeout(() => {
            msg.edit(`Kazandın, \`${random}\` geldi! Kazancın: **${amount}**`)
          }, 1500);
          await userModel.update(user, { $inc: { money: amount } });
        }
        else {
          let msg = await message.channel.send(`Para dönüyor!`);
          setTimeout(() => {
            msg.edit(`Kaybettin, \`${random}\` geldi! Kaybın: **${amount}**`)
          }, 1500);
          await userModel.update(user, { $inc: { money: -amount } });
        }
      }
    }
    else return message.channel.send('Lütfen geçerli bir seçenek belirt. Doğru kullanım: ``yazıtura <yazı | tura> <miktar>``')
  },
};
