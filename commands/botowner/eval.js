const Discord = require('discord.js')

module.exports = {
  commandName: "eval",
  aliases: [],
  desc: "Komut çalıştırır",
  usage: "eval <komut>",
  permLevel: "BOT_OWNER",
  category: "",

  execute: async (client, message, args, database) => {
    let codein = args.slice(0).join(" ");
    if (!codein.toLowerCase().includes("token")) {
      try {
        let code = eval(codein);
        if (codein.length < 1)
          return message.channel.send(`:x: Bir kod girmelisin.`);
        if (typeof code !== "string")
          code = require("util").inspect(code, { depth: 0 });

        const embed = new Discord.MessageEmbed()
          .setColor("GREEN")
          .addField(
            "Kod",
            `\`\`\`js\n${
              codein.length > 1024 ? "Karakter aşımı!" : codein
            }\`\`\``
          )
          .addField(
            "Sonuç",
            `\`\`\`js\n${code.length > 1024 ? "Karakter aşımı!" : code}\n\`\`\``
          );
        message.channel.send(embed);
      } catch (e) {
        let embed2 = new Discord.MessageEmbed()
          .setColor("RED")
          .addField(
            "Kod",
            `\`\`\`js\n${
              codein.length > 1024 ? "Karakter aşımı!" : codein
            }\`\`\``
          )
          .addField(
            "Hata",
            `\`\`\`js\n${e.length > 1024 ? "Karakter aşımı!" : e}\`\`\``
          );
        message.channel.send(embed2);
      }
    }
  },
};
