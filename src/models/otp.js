const mongoose = require("mongoose");
const {Schema, model} = mongoose;


const otpInfoSchema = new Schema({
    emailId: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true
    },
    otpHash: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    },
    attempts: {
        type: Number
    },
},
{
    timestamps: true
});

otpInfoSchema.index(
  { expiresAt: 1 },
  { expireAfterSeconds: 0 }
);

const otpInfoModel = model("OtpInfo", otpInfoSchema);

module.exports = otpInfoModel;