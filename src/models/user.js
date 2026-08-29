const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String
    },
    lastName: String,
    emailId: String,
    password: String,
    age: Number,
    gender: String
})

const userModel = model("User", userSchema);

module.exports = {
    userModel
}