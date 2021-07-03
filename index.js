const Discord = require("discord.js")
const client = new Discord.Client();
require('dotenv').config()

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

//DATABASE
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true, useUnifiedTopology: true
})
const database = mongoose.connection

//COMMANDS
const fs = require('fs')
let counter = 0
fs.readdir('./commands', (err, folders) => {
    folders.forEach(folder => {
        fs.readdir(`./commands/${folder}`, (err, files) => {
            files.forEach(file => {
                counter += 1
                let commandProps = require(`./commands/${folder}/${file}`)
                client.commands.set(commandProps.commandName, commandProps)
                commandProps.aliases.forEach(alias => {
                    client.aliases.set(alias, commandProps.commandName)
                })
                console.log(`❤️  Komut başarıyla yüklendi: ${commandProps.commandName}`)
            })
        })
    })
})

const axios = require('axios')

database.once('open', () => {
    require('./models/User')
    require('./models/Server')
    require('./util/loader.js')(client, database);
    console.log(`😊 ${counter} adet komut başarıyla yüklendi!`)
    console.log('✅ Database bağlanıldı!')
    client.login(process.env.TOKEN)

    const timer = setInterval(async () => {
        console.log('DÖVİZ AKTİF!')

        const serverModel = database.models.serverModel;
        const serversdata = await serverModel.find()
        const servers = serversdata.filter(server => server.currencyexchange != '')
        
        const apiKey = process.env.APIKEY

        //DOLAR
        let url = `http://free.currconv.com/api/v7/convert?q=USD_TRY&apiKey=${apiKey}`
        let res = await axios.get(url)
        let datadolar = res.data

        //EURO
        url = `http://free.currconv.com/api/v7/convert?q=EUR_TRY&apiKey=${apiKey}`
        res = await axios.get(url)
        let dataeuro = res.data

        let embed = new Discord.MessageEmbed()
            .setColor('#E81224')
            .setTitle('Döviz kuru')
            .setDescription(`**1 dolar**: \`${datadolar.results.USD_TRY.val}\` \n**1 euro**: \`${dataeuro.results.EUR_TRY.val}\``)
            .setFooter('Hedef 2023!', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Flag_of_Turkey.svg/220px-Flag_of_Turkey.svg.png')

        servers.forEach(async server => {
            let channel = client.guilds.cache.get(server.id).channels.cache.get(server.currencyexchange)
            if(!channel) return
            
            await channel.send(embed)
        })
    }, 14400000);
})
