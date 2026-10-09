const crypto = require("crypto");


const OTP_SECRET = "Hellow#1234";

function hashOtp(emailId, otp) {
  return crypto
    .createHmac("sha256", OTP_SECRET)
    .update(`${emailId}:${otp}`)
    .digest("hex");
}

module.exports = {
    hashOtp
}