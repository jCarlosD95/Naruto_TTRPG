const Discord = require('discord.js');

/*I think this should be an async function because some of the functions 
 *it calls will be asynchronous. 
 */
 async function parse(message) {
    //test to see if I understand how messages work
    if (message.content[0] = "!")
        message.author.send("You sent an exclamation mark!")
};

module.exports.parse = parse;
