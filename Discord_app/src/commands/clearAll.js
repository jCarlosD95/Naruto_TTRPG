const { SlashCommandBuilder } = require("discord.js");
const objSchema = require("../schema/objSchema.js");
const roundSchema = require("../schema/roundSchema.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("reset-game")
    .setDescription("Resets the battlefield"),
  async execute(interaction) {
    //Defer reply to give bot time to perform query
    await interaction.deferReply({ ephemeral: true });

    //Delete all objects in objSchema
    await objSchema.deleteMany();
    //Set round to 0
    isRound = await roundSchema.find();
    if (isRound.length) {
      await roundSchema.updateMany({}, { $set: { round: 0 } });
    } else {
      await roundSchema.create({ round: 0 });
    }

    //if the object isn't found, let user know
    await interaction.editReply(`The battlefield is cleared and round reset!`);
  },
};
