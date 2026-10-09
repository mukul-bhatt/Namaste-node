const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 50
    },
    lastName: {
        type: String,
        minLength: 2,
        maxLength: 50
    },
    emailId: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true
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
                if(!["male", "female", "others"].includes(value)){
                    throw new Error("Gender must be one of male, female, others");
                }else{
                    return true;
                }
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
},
{
    timestamps: true
}
)

const userModel = model("User", userSchema);

module.exports = {
    userModel
}