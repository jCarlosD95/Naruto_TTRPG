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

    const filter = { objName: objectName };     //object name = "Charlie"
    const update = { objLocation: objectLoc };  //objectLocation = "Canada"

    /*original object: 
    {
        objName:     "Charlie"
        objLocation: "USA"
    }
    */
    let test = await objSchema.findOneAndUpdate(filter, update, {new: true});
     /*intended result: 
    {
        objName:     "Charlie"
        objLocation: "Canada"
    }
    */

    if (test === null) {
      await interaction.reply({
        content: `${test["objName"]} doesn't seem to exist!`,
        ephemeral: true,
      });
    } else {
      test = await objSchema.findOne(filter);
      await interaction.reply({
        content: `${test["objName"]} has been moved to ${test["objLocation"]}!`,
        ephemeral: true,
      });
    }
  },
};
