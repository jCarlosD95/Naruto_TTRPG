
const objSchema = require("../schema/schema.js");

//This function checks whether or not the previously
//created or moved object intersects with another existing object.
//If it does, it notifies the owners of all relevant objects.
async function check(object, objLoc, interaction){
    let locQuery = await objSchema.find({objLocation: objLoc});
    let sendString = `${object["objName"]} is at ${objLoc}, the same location as:\n`; //the string to be sent to the users.
    
    //false until a true collision is detected
    let sendList = [];

    for (item in locQuery){
        //Make sure that we don't send messages to someone whose object intersects with itself.
        if(locQuery[item]["owner"] !== object["owner"]) {
            
            if (!sendList.includes(locQuery[item]["owner"]))
                sendList.push(locQuery[item]["owner"]);

            if (!sendList.includes(object["owner"]))
                sendList.push(object["owner"]);

            //Construct a string and send it to both users
            sendString +=  `${locQuery[item]["objName"]}\n`
        }
    }

    //Send the string full of collisions to each user in the sendList
    for (user in sendList){
        console.log(`User: ${sendList[user]}\n`)
        interaction.client.users.send(sendList[user], sendString);
    }
}


module.exports.check = check;