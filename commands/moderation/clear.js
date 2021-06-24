module.exports = {
  commandName: "temizle",
  aliases: ["clear", "cl"],
  desc: "Chatteki gereksiz mesajlardan kurtul!",
  usage: "temzile <miktar, maximum 100>",
  permLevel: "MANAGE_MESSAGES",
  category: "Moderasyon",

  execute: async (client, message, args) => {
    let amount = args[0];
    if (!amount || isNaN(amount) || amount > 100) {
      if (!amount)
        return message
          .reply(
            "Lütfen bir miktar giriniz! Doğru kullanım: `temzile <miktar, maximum 100>`"
          )
          .then((sent) => {
            setTimeout(() => {
              sent.delete();
            }, 4000);
          });
      if (isNaN(amount))
        return message
          .reply("Lütfen geçerli bir miktar giriniz.")
          .then((sent) => {
            setTimeout(() => {
              sent.delete();
            }, 4000);
          });
      if (amount > 100)
        return message
          .reply("Lütfen 100'den küçük bir miktar giriniz!")
          .then((sent) => {
            setTimeout(() => {
              sent.delete();
            }, 4000);
          });
    }

    message.channel.bulkDelete(amount, true).then((_message) => {
      message.channel.send(`**${amount}** adet mesaj silindi!`).then((sent) => {
        setTimeout(() => {
          sent.delete();
        }, 4000);
      });
    });
  },
};
