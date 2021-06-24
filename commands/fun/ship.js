const request = require("node-superfetch");
const { createCanvas, loadImage, registerFont } = require("canvas");
const path = require("path");

registerFont(
  path.join(__dirname, "..", "..", "src", "fonts", "Kiona-Regular.ttf"),
  { family: "Kiona Regular" }
);

module.exports = {
  commandName: "ship",
  aliases: ["aşkölçer"],
  desc: "Aşk ölçer!",
  usage: "ship <@kullanıcı1> <kullanıcı2>",
  permLevel: null,
  category: "Eğlence",

  execute: async (client, message, args) => {
    const user1 = message.mentions.users.first(1)[0];
    const user2 = message.mentions.users.first(-1)[0];

    if (!user1)
      return message.reply(
        "Birilerini etiketlemelisin! Doğru kullanım: m!ship <@kullanıcı1> <@kullanıcı2>"
      );
    if (!user2)
      return message.reply(
        "İkinci bir kullanıcı etiketlemelisin! Doğru kullanım: m!ship <@kullanıcı1> <@kullanıcı2>"
      );
    if (user1 == user2)
      return message.reply("Aynı kullanıcıyı etiketlemeni tavsiye etmem :))");

    message.channel.send("İşleniyor...").then(async (msg) => {
      try {
        const base = await loadImage(
          path.join(__dirname, "..", "..", "src", "images", "ship.jpg")
        );
  
        const user1URL = user1.displayAvatarURL({ format: "png", size: 512 });
        const user2URL = user2.displayAvatarURL({ format: "png", size: 512 });
  
        const body1 = await request.get(user1URL);
        const avatar1 = await loadImage(body1.body);
  
        const body2 = await request.get(user2URL);
        const avatar2 = await loadImage(body2.body);
  
        const canvas = createCanvas(base.width, base.height);
        const ctx = canvas.getContext("2d");
  
        ctx.fillRect(0, 0, base.width, base.height);
        ctx.drawImage(base, 0, 0);
  
        ctx.drawImage(avatar1, 335, 290, 380, 380);
        ctx.drawImage(avatar2, 1206, 290, 380, 380);
  
        ctx.textAlign = "center";
        ctx.shadowOffsetX = 3;
        ctx.shadowOffsetY = 3;
        ctx.shadowBlur = 4;
        ctx.shadowColor = "rgba(0,0,0,0.3)";
  
  
        ctx.font = "75px Kiona Regular";
        ctx.fillStyle = "white";
        ctx.fillText(user1.username, 515, 750);
        ctx.fillText(user2.username, 1390, 750);
  
        const randomPercentage = Math.floor(Math.random() * 101);
        ctx.font = "110px Kiona Regular";
        ctx.fillStyle = "white";
        ctx.fillText(`%${randomPercentage}`, 960, 1010);
  
        ctx.fillStyle = "red";
        ctx.fillRect(335, 814, randomPercentage * 12.7, 76);
        
        await message.channel.send({
          files: [{ attachment: canvas.toBuffer(), name: "ship.jpg" }],
        });
        await msg.edit("İşlendi!")
      } catch {
        message.reply(
          `Oh no, an error occurred: \`${err.message}\`. Try again later!`
        );
      }
    })
  },
};
