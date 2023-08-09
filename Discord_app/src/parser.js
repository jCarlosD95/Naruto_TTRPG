const Discord = require("discord.js");

/*I think this should be an async function because some of the functions
 *it calls will be asynchronous.
 */
async function parse(message) {
  //test to see if I understand how messages work
  let testString = message.content.split('');
  if ((testString[0] === "!"))
    message.author.send("You sent an exclamation mark!").catch((error) => {console.log("Whoopsie!");});

  let cmd = message.content.split(" ");
  if (cmd[0] === "get")
    message.author.send("bing bong, bitch!").catch((error) => {console.log("Whoopsie!");});
}

module.exports.parse = parse;
