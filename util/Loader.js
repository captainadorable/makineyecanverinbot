const reqEvent = event => require(`../events/${event}`);
module.exports = (client, database) => {
  client.on('ready', () => reqEvent('ready')(client));
  client.on('message', msg => reqEvent('message')(msg, database));
};
