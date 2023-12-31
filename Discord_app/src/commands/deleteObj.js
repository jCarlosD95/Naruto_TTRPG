const { SlashCommandBuilder } = require("discord.js");
const objSchema = require("../schema/objSchema.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("delete-object")
    .setDescription("Deletes a hidden ninja or item")
    //Add option where user fills in object name
    .addStringOption((option) =>
      option
        .setName("object-name")
        .setDescription("The name of the ninja or item")
        .setRequired(true)
    ),
  async execute(interaction) {
    //Defer reply to give bot time to perform query
    await interaction.deferReply({ephemeral: true});

    //getting the object name from command input
    const objectName = interaction.options.getString("object-name");
    const filter = { objName: objectName }; //The filter to find the ninja/item

    //Find an object based on name and delete it.
    let test = await objSchema.findOneAndDelete(filter);

    //if the object isn't found, let user know
    if (test === null) {
      await interaction.editReply(`${objectName} doesn't seem to exist! Did you spell it right?`);
    } else {
      //If object is found and updated, then tell user.
      await interaction.editReply(`${test["objName"]} has been deleted!`);
    }
  },
};
