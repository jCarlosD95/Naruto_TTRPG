const { SlashCommandBuilder } = require("discord.js");
const objSchema = require("../schema/schema.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("new-object")
    .setDescription("Creates a new hidden object")
    //Add option where user fills in object name
    .addStringOption((option) =>
      option
        .setName("object-name")
        .setDescription("The name of the player or item")
        .setRequired(true)
    )
    //Add option where user fills in object location
    .addStringOption((option) =>
      option
        .setName("object-location")
        .setDescription("The location of the player or item")
        .setRequired(true)
    ),
  async execute(interaction) {
    //getting the object names and locations from command input
    const objectName = interaction.options.getString("object-name");
    const objectLoc = interaction.options.getString("object-location");

    //tests to see if things work the way I think they do.
    //await interaction.reply({ content: objectName, ephemeral: true });

    //look for the object in the DB. if it's there already, notify user.
    //Else, create it and notify user

    let test = await objSchema.findOne({owner: interaction.user.id, objName: objectName});

    if (test === null){
        test = await objSchema.create({
            owner: interaction.user.id,
            objName: objectName,
            objLocation: objectLoc,
        });
        await interaction.reply({
            content: `Created ${test["objName"]}!`,
            ephemeral: true
        })
    }else {
        await interaction.reply({
            content: `${test["objName"]} already exists!`,
            ephemeral: true
        })
    }
  },
};
