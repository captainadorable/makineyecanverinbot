const talkedRecently = new Set();

module.exports = async (message, database) => {

    let serverModel = await database.models.serverModel;
    let server = await serverModel.findOne({ id: message.guild.id }).exec();
    
    let prefix = server ? server.prefix : 'm!';
    let client = message.client;
    let owner_id = '545978545302798356'

    let command = message.content.split(" ")[0].slice(prefix.length).toLowerCase();
    let params = message.content.split(" ").slice(1);
    let cmd;

    if (message.author.bot) return;
    if (!message.content.toLowerCase().startsWith(prefix)) return;
    if(!message.guild) return
    //GETTING COMMAND
    if(client.commands.has(command)) cmd = client.commands.get(command)
    else if (client.aliases.get(command)) cmd = client.commands.get(client.aliases.get(command))
    
    
    if (cmd) {
        
        if (talkedRecently.has(message.author.id)) {
            message.reply('Tekrar komut kullanmadan önce `3 saniye` beklemen gerek!')
            return;
        } else {
            talkedRecently.add(message.author.id);
            setTimeout(() => {
            talkedRecently.delete(message.author.id);
            }, 3000);
        }
        
        //PERMISSIONS
        if (cmd.permLevel == 'BOT_OWNER' && message.author.id != owner_id) return message.reply(`Bu komutu kullanmak için \`${cmd.permLevel}\` yetkisine sahip olmalısın!`)
        if (cmd.permLevel && !message.member.hasPermission(cmd.permLevel) && message.author.id != owner_id) return message.reply(`Bu komutu kullanmak için \`${cmd.permLevel}\` yetkisine sahip olmalısın!`)
        
        cmd.execute(client, message, params, database)
    }
};
