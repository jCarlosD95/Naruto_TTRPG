const { SlashCommandBuilder } = require("discord.js");
const objSchema = require("../schema/objSchema.js");
const roundSchema = require("../schema/roundSchema.js");
const { check } = require("../functions/checkIntersections.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("move-object")
    .setDescription("Changes a hidden ninja or item's location")
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
    //Need to defer the reply so that the application has more time to think.
    await interaction.deferReply({ ephemeral: true });

    //getting the object names and locations from command input
    const objectName = interaction.options.getString("object-name");
    const objectLoc = interaction.options.getString("object-location");
    //getting round from database.
    const storeRound = await roundSchema.findOne();

    const filter = { objName: objectName }; //The filter to find the ninja/item

    //Find an object based on name and update it.
    let test = await objSchema.findOneAndUpdate(
      filter,
      {
        objLocation: objectLoc,

        $push: {
          locPerRound: {
            round: storeRound["round"],
            location: objectLoc,
          },
        },
      },
      { new: true }
    );
    //await objSchema.findOneAndUpdate(filter, update);

    //if the object isn't found, let user know
    if (test === null) {
      await interaction.editReply(
        `${objectName} doesn't seem to exist! Did you spell it right?`
      );
    } else {
      //If object is found and updated, then tell user.
      await interaction.editReply(
        `${test["objName"]} has been moved to ${test["objLocation"]}!`
      );
      check(test, objectLoc, interaction);
    }
  },
};
