const { SlashCommandBuilder } = require("discord.js");
const objSchema = require("../schema/objSchema.js");
const roundSchema = require("../schema/roundSchema.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("set-round")
    .setDescription(
      "sets the round to a specific number"
    ).addNumberOption((option) =>
    option
      .setName("round")
      .setDescription("The round you want to set the game at")
      .setRequired(true)
  ),
    async execute(interaction) {
        //Defer reply to give bot time to perform query
        await interaction.deferReply({ephemeral: true});
        //
        isRound = await roundSchema.find();
        if (isRound.length) {
            await roundSchema.updateMany({},{$set: {round: interaction.options.getNumber("round")}});
        } else {
            await roundSchema.create({round: interaction.options.getNumber("round")})
        }


        //if the object isn't found, let user know
        await interaction.editReply(`The round has been set!`);
    }
}