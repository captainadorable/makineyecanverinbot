module.exports = {
  commandName: "taşı",
  aliases: ["mm", "movemembers"],
  desc: "Kanaldaki kullanıcıları başka kanala taşı!",
  usage: "taşı",
  permLevel: "MOVE_MEMBERS",
  category: "Moderasyon",

  execute: async (client, message, args) => {
    let kanalno;
    if (message.member.voice.channel == null) return message.reply("Lütfen bir kanala katıl!")
    let filter = (msg) => msg.author.id == message.author.id;
    let kanallar = [{}];
    let sayaç = 0;
    let string = "```";
    let kanal2;
    message.channel.guild.channels.cache.forEach(function (i) {
      if (i.type == "voice") {
        sayaç += 1;
        kanallar.push({
          key: i.name,
          value: sayaç,
        });
      }
    });

    kanallar.forEach(function (a) {
      if (a.value == undefined) {
      } else {
        string += a.value + " : " + a.key + "\n";
      }
    });

    string += "```";

    message.channel.send(string);
    message.channel.send("Lütfen bir kanal numarası seç! 30 saniye içerisinde iptal edilecek!")

    await message.channel
      .awaitMessages(filter, { max: 1, time: 30000, errors: ["time"] })
      .then((collector) => {
        if (collector) {
          kanalno = parseInt(collector.first());
        }
      });

    kanallar.forEach(function (a) {
      if (a.value == kanalno) {
        kanalno = a.key;
      }
    });

    kanal2 = message.guild.channels.cache.find(
      (channel) => channel.name === kanalno
    );
    if (!kanal2) {
      message.reply("Taşıyacağım kanalı bulamadım!")
      return;
    }

    message.guild.channels.cache
      .get(message.member.voice.channel.id)
      .members.forEach((x) => x.voice.setChannel(kanal2.id));

    message.channel.send(`Kullanıcılar başarıyla \`${message.member.voice.channel.name}\` kanalından \`${kanal2.name}\` kanalına taşındı!`)
  },
};
