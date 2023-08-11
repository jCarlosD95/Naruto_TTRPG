const { SlashCommandBuilder } = require("discord.js");
const objSchema = require("../schema/schema.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("list-my-objects")
    .setDescription(
      "Reads you the location all of your hidden ninjas and items"
    ),
  async execute(interaction) {
    //Find all of the objects a user has and store in hiddenObjects.
    let hiddenObjects = await objSchema.find({ owner: interaction.user.id });

    //if no objects are found, let user know
    if (hiddenObjects.length) {
      //If object(s) is found, print the list of them for the user.
      let replyString = "You have the following hidden ninjas and items:\n\n";
      for (obj in hiddenObjects) {
        replyString += `${hiddenObjects[obj]["objName"]} is hidden at ${hiddenObjects[obj]["objLocation"]}.\n`;
      }
      await interaction.reply({
        content: replyString,
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: `You don't have a hidden ninja or items on the battlefield yet!`,
        ephemeral: true,
      });
    }
  },
};
