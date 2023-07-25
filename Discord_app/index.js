const {token} = require('./config.js')
const Discord = require('discord.js');
const { Partials } = require('discord.js');


const prefix = '!';

const client = new Discord.Client({
    allowedMentions: {
        parse: [`users`,`roles`],
        repliedUser: true,
    },
    intents: [
        'Guilds',
        'GuildMessages',
        //'GuildPresences',
        //'GuildMembers', //"GUILD_MEMBERS",
        'GuildMessageReactions', //"GUILD_MESSAGE_REACTIONS",
        'DirectMessages', //"DIRECT_MESSAGES",
        'MessageContent',
    ],

    partials: [
        Partials.Channel,
    ],
});

client.on("ready", () => {
    console.log("Bot is online!")
})

client.on('messageCreate', async message =>{
    console.log("Message!")
    if (message.channel.isDMBased()) {
        message.author.send("You are DMing me now!");
        return;
    }
})

client.login(token)