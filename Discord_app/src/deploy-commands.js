const { REST, Routes } = require('discord.js');
require('dotenv').config();
const fs = require('node:fs');
const path = require('node:path');

const commands = [];

///grab all the command files from the commands directory
const folderPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(folderPath)
    .filter(file =>file.endsWith('.js'));

for (const file of commandFiles) {
    //join the name of the file to the folder path to get the file's path
    const filePath = path.join(folderPath, file);
    //require each command at its file path
    const command = require(filePath);
    if ('data' in command && 'execute' in command){
        commands.push(command.data.toJSON());
    } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
    
}
//construct and prepare an instance of the REST module
const rest = new REST().setToken(process.env.token);

//and deploy your commands
(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        //The put method is used to fully refresh all commands in the guild with the current set
        const data = await rest.put(
            Routes.applicationGuildCommands(process.env.clientId, process.env.guildId),
            { body: commands },
        );
    
        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
})();