const discord = require('discord.js')
const config = require('./config.json')
const intents = discord.Intents
const client = new discord.Client({intents:[intents.FLAGS.GUILDS,intents.FLAGS.GUILD_MESSAGES,intents.FLAGS.GUILD_MEMBERS]})
exports.client = client

require("./checker")()

client.on('ready',async () => {
    const chalk = await (await import("chalk")).default
    console.log(chalk.green("open-ticket ready!"))
    if (config.logs){chalk.white("\n\nlogs:\n============")}
    if (config.status.enabled){
        client.user.setActivity(config.status.text,{type:config.status.type})
    }
})

var storage = require('./storage/storage')
exports.TicketStorage = storage.ticketStorage
exports.userTicketStorage = storage.userTicketStorage
exports.transcriptStorage = storage.transcriptStorage
exports.ticketNumberStorage = storage.ticketNumberStorage

var ticket = require('./commands/ticket')
ticket()

var ticketSystem = require('./commands/ticketSystem')
ticketSystem()

var ticketExtra = require("./commands/ticketExtra")
ticketExtra()

var database = require('./commands/database')
database()


client.login(config.auth_token)