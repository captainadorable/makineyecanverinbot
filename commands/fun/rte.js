const { createCanvas, loadImage, registerFont } = require("canvas");
const path = require("path");
registerFont(
  path.join(__dirname, "..", "..", "src", "fonts", "Roboto-Regular.ttf"),
  { family: "Roboto Regular" }
);

module.exports = {
  commandName: "rte",
  aliases: [],
  desc: "Silivri soğuktur dikkat et!",
  usage: "rte <mesaj>",
  permLevel: null,
  category: "Eğlence",

  execute: async (client, message, args) => {
    const text = args.slice(0).join(" ");
    const text2 = "";
    if (!text)
      return message.reply(
        "Lütfen bir mesaj giriniz. Doğru kullanım: m!rte <mesaj>"
      );

    if (text.length > 40)
      return message.reply("Mesaj 40 karakterden kısa olmalı!");

    try {
      const base = await loadImage(
        path.join(__dirname, "..", "..", "src", "images", "rte.png")
      );
      const canvas = createCanvas(base.width, base.height);
      const ctx = canvas.getContext("2d");
      ctx.fillRect(0, 0, base.width, base.height);
      ctx.drawImage(base, 0, 0);
      ctx.fillStyle = "white";
      ctx.font = "30px Roboto Light";
      ctx.fillText(text, 20, 95, 550);
      message.channel.send({
        files: [{ attachment: canvas.toBuffer(), name: "rte.png" }],
      });
    } catch (err) {
      message.reply(
        `Oh no, an error occurred: \`${err.message}\`. Try again later!`
      );
    }
  },
};
