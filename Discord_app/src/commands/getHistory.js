const { SlashCommandBuilder } = require("discord.js");
const objSchema = require("../schema/objSchema.js");
const roundSchema = require("../schema/roundSchema.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("get-history")
    .setDescription("Reads you the location history of a hidden ninja or item")
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
    let obj = await objSchema.findOne(filter);

    //if the object isn't found, let user know
    if (obj === null) {
      await interaction.editReply(`${objectName} doesn't seem to exist! Did you spell it right?`);
    } else {

        let sendString =   `Here is the location history for ${obj["objName"]}:\n`

        //iterate through the location and round history add them to a string
        /*
         * reminder of the structure of objSchema:
         * 
         *  objSchema {
         *      locPerRound {
         *          round: Integer
         *          location: String
         *      }
         *  }
         * 
         */
        /*
        for (entry in obj["locPerRound"]) {
            let objName = obj["objName"];
            let round = obj["locPerRound"][entry]["round"];
            let location = obj["locPerRound"][entry]["location"];

            sendString += `At round ${round}, ${objName} was at ${location}.\n`;
        }
        */
       
        obj["locPerRound"].forEach((entry, index) => {
            sendString += `At round ${entry["round"]}, ${objectName} was at ${entry["location"]}.\n`;
        });

      //If object is found and updated, then tell user.
      await interaction.editReply(sendString);
    }
  },
};
