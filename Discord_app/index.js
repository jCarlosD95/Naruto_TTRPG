const {token} = require('./config.js');
const Discord = require('discord.js');

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
        'GuildMembers', //"GUILD_MEMBERS",
        'GuildMessageReactions', //"GUILD_MESSAGE_REACTIONS",
        'DirectMessages', //"DIRECT_MESSAGES",
        'MessageContent',
    ],
});

client.on("ready", () => {
    console.log("Bot is online!")
})

client.on('messageCreate', message => {

    console.log(message.content);   
    //If the message doesn't start with the prefix or was sent by a bot, return and exit.
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    //not QUITE sure what this does. It seems to slice off the prefix
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    //test command
    console.log(command);
    if (command === 'test') {
        message.channel.send('This is a test!');
    }
})

client.login(token)