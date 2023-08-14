const { SlashCommandBuilder } = require("discord.js");
const objSchema = require("../schema/schema.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("list-my-objects")
    .setDescription(
      "Reads you the location all of your hidden ninjas and items"
    ),
  async execute(interaction) {
    //Need to defer the reply so that the application has more time to think.
    await interaction.deferReply({ ephemeral: true });

    //Find all of the objects a user has and store in hiddenObjects.
    let hiddenObjects = await objSchema.find({ owner: interaction.user.id });

    //if no objects are found, let user know
    if (hiddenObjects.length) {
      //If object(s) is found, print the list of them for the user.
      let replyString = "You have the following hidden ninjas and items:\n\n";
      for (obj in hiddenObjects) {
        replyString += `${hiddenObjects[obj]["objName"]} is hidden at ${hiddenObjects[obj]["objLocation"]}.\n`;
      }
      await interaction.editReply(replyString);
    } else {
      await interaction.editReply(
        `You don't have a hidden ninja or items on the battlefield yet!`
      );
    }
  },
};
