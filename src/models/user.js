const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    emailId: {
        type:String,
        required: true

    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
        min: 18,
        max:65
    },
    gender:{
        type: String,
        required: true,
        validate:{
            validator: (value) =>{
                return ["male", "female", "others"].includes(value);
            }
        }
    },
    about: {
        type: String,
        default: "This is the default value of about"
    },
    photoUrl: {
        type: String,
        default: "https://static.vecteezy.com/system/resources/previews/026/434/409/non_2x/default-avatar-profile-icon-social-media-user-photo-vector.jpg"
    },
    skills: [String]
})

const userModel = model("User", userSchema);

module.exports = {
    userModel
}