const { SlashCommandBuilder } = require("discord.js");
const objSchema = require("../schema/schema.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("move-object")
    .setDescription("Changes a hidden object's location")
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

    const filter = { objName: objectName }; //object name = "Charlie"
    const update = { objLocation: objectLoc }; //objectLocation = "Canada"

    //Find an object based on name and update it.
    let test = await objSchema.findOneAndUpdate(filter,update, {new: true});

    //if the object isn't found, let user know
    if (test === null) {
      await interaction.reply({
        content: `${objectName} doesn't seem to exist! Did you spell it right?`,
        ephemeral: true,
      });
    } else {
      //If object is found and updated, then tell user.
      await interaction.reply({
        content: `${test["objName"]} has been moved to ${test["objLocation"]}!`,
        ephemeral: true,
      });
    }
  },
};
