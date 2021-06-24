module.exports = async (client) => {
  client.user.setPresence({
    activity: { type: "WATCHING", name: `Geliştiriliyor!` },
    status: "dnd",
  });
  console.log(`✅ Bot [${client.user.username}] ismiyle aktif!`);
};
