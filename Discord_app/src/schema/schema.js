const {Schema, model, models } = require("mongoose");

//a schema for objects hidden in the battlefield
const objSchema = new Schema({
    //Object key
    _id: {
        type: String,
        required: true
    },
    //User who controls object
    owner: {
        type: String,
        required: true
    },
    //Name of the object
    objName: {
        type: String,
        required: true
    },
    //location of the object on the battlefiedl
    objLocation: {
        type: String,
        required: false
    }

});

const name = "objSchema";
module.exports = models[name] || model(name, objSchema);