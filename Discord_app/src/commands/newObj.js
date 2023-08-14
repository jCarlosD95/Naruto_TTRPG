const { SlashCommandBuilder } = require("discord.js");
const objSchema = require("../schema/schema.js");
const { check } = require("../functions/checkIntersections.js")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("new-object")
    .setDescription("Creates a new hidden ninja or item")
    //Add option where user fills in object name
    .addStringOption((option) =>
      option
        .setName("object-name")
        .setDescription("The name of the ninja or item")
        .setRequired(true)
    )
    //Add option where user fills in object location
    .addStringOption((option) =>
      option
        .setName("object-location")
        .setDescription("The location of the ninja or item")
        .setRequired(true)
    ),
  async execute(interaction) {
    //defer reply to give bot time to think
    await interaction.deferReply({ephemeral: true});

    //getting the object name and location from command input
    const objectName = interaction.options.getString("object-name");
    const objectLoc = interaction.options.getString("object-location");

    //look for the object in the DB. if it's not there already, create it and notify user.
    //Else, notify user

    let test = await objSchema.findOne({owner: interaction.user.id, objName: objectName});

    if (test === null){
        test = await objSchema.create({
            owner: interaction.user.id,
            objName: objectName,
            objLocation: objectLoc,
            whurl: interaction.webhook.url
        });
        await check(test, objectLoc, interaction)
        await interaction.editReply(`Created ${test["objName"]}!`);
    }else {
        await interaction.editReply(`${test["objName"]} already exists!`);
    }
  },
};
