//Storing the number of rounds that has passed externally in my database
const {Schema, model, models } = require("mongoose");

const roundSchema = new Schema({
    round: {
        type: Number,
        required: true,
    }
});

const name = "roundSchema";
module.exports = models[name] || model(name, roundSchema);