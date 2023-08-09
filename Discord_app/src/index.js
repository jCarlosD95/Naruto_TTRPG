const Discord = require('discord.js');
const { Client, Collection, Events, GatewayIntentBits, Partials } = require('discord.js');
require('dotenv').config();
const mongoose = require("mongoose");
const objSchema = require("./schema/schema")
const fs = require('node:fs');
const path = require('node:path');
const { parse } = require("./parser.js");


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

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath)
    .filter(file => file.endsWith('.js'));


for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    //set a new item in the collection with the key as 
    //the command name and the value as the exported module
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else{
        console.log(`[WARINING]: CMD at ${filePath} missing a required "data" or "execute" property.`);
    }
}

client.on("ready", () => {
    console.log("Bot is online!")

    //Connect to Mongo DB and keep the connection open continuously
    //mongoose.connect(process.env.dbToken)
});


//Event listener
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand())return;
    console.log(interaction);

    //Get the command based on command name
    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    try{
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred){
            await interaction.followUp({content: 'there was an error while executing this command', ephemeral: true});
        } else {
            await IntegrationApplication.reply({content: 'There was an error while executing this command', ephemeral: true});
        }
    }
});

//Responds"You are DMing me now!" if user DMs the bot.
client.on('messageCreate', async message =>{
    
    //Don't execute if the bot is the sender.
    if(message.author.id === client.user.id) 
        return;

    if (message.channel.isDMBased()) {
        message.author.send("You are DMing me now!");
        await parse(message);
        return;
    }
});

client.login(process.env.token)