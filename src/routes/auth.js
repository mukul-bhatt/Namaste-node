const express = require("express");
const { userModel } = require("../models/user");
const bcrypt = require("bcrypt");
const { validateSignUpData } = require("../utils/validation");
const jwt = require("jsonwebtoken");
const { secretKey } = require("../middlewares/authMiddleware");
const crypto = require("crypto");
const { hashOtp } = require("../utils/helpers");
const otpInfoModel = require("../models/otp");

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    // Validation of signup data
    validateSignUpData(req);

    const {
      firstName,
      lastName,
      emailId,
      password,
      age,
      gender,
      about,
      photoUrl,
    } = req.body;

    // Hash the pasword
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
      age,
      gender,
      about,
      photoUrl,
    });

    await newUser.save();
    res.send("User created successfully");
  } catch (err) {
    console.error("Error occured in /signup api", err);
    res.status(400).send("ERROR: " + err.message);
  }
});

router.post("/login", async (req, res) => {
  const { emailId, password } = req.body;

  // console.log(emailId, password);

  // Check if it is a valid user
  try {
    const user = await userModel.findOne({ emailId: emailId });

    if (!user) {
      res.status(400).send("Invalid credentials");
      return;
    }

    // If it is a valid user, match the passwords
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (isValidPassword) {
      const token = jwt.sign(
        {
          id: user._id,
        },
        secretKey,
        { expiresIn: "1h" },
      );

      res.cookie("token", token);
      res.send({
        msg: "Login successful",
      });
    } else {
      res.status(400).send("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

router.post("/logout", (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });

  res.status(200).send("Logout successful");
});

router.post("/sendForgotPasswordOtp", async (req, res) => {
  try {
    // console.log("EMailID", emailId);
    const rawEmailId = req.body.emailId;

    if (typeof rawEmailId !== "string" || !rawEmailId.trim()) {
      return res.status(400).send("A valid email address is required");
    }

    const emailId = rawEmailId.trim().toLowerCase();
    // Check if this is a valid email address in the database
    const result = await userModel.exists({
      emailId: emailId,
    });

    // console.log("result", result);
    // If user does not exists in the database
    if (!result) {
      throw new Error("Something went wrong");
    }

    // generate a cryptographically secure otp
    const otp = crypto.randomInt(100000, 1000000);
    // console.log("otp", otp);

    // then store the otp as a key value pair tied to the particular user
    const otpHash = hashOtp(emailId, otp);

    await otpInfoModel.findOneAndUpdate(
      { emailId },
      {
        otpHash,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000),
        attempts: 0,
      },
      { upsert: true, returnDocument: "after", setDefaultsOnInsert: true },
    );

    // for If user exists, send them a otp that is valid for 5 minutes  - later we will send it in the email

    res.send({
      email: emailId,
      otp: otp,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
});

router.patch("/forgotPassword", async (req, res) => {
    try{

   
  const { otp, newPassword, confirmPassword, emailId } = req.body;

  // Check if otp is the valid otp for this user
  const otpRecord = await otpInfoModel.findOne({ emailId });

  if (!otpRecord || otpRecord.expiresAt <= new Date()) {
    return res.status(400).send("Invalid or expired OTP");
  }

  const submittedOtpHash = hashOtp(emailId, String(otp));

  if (submittedOtpHash !== otpRecord.otpHash) {
    return res.status(400).send("Invalid or expired OTP");
  }

  // Check both passwords are same, create a hash of the password and update it
  if (newPassword !== confirmPassword){
    throw new Error("Passwords do not match");
  }

  // Create the hash for the new password and then update the hash
  if (typeof newPassword !== "string" || newPassword.length === 0) {
    return res.status(400).send("Password must be a non-empty string");
    }

  const passwordHash = await bcrypt.hash(newPassword, 10);

  const updatedUser = await userModel.findOneAndUpdate(
  { emailId },
  { password: passwordHash } ,
  { runValidators: true, returnDocument: "after" }
);
  res.send({
    msg: "Your password has been updated successfully",
    data: updatedUser
  });

   }catch(err){
        console.log(err);
        res.status(400).send(err.message);
    }
});

module.exports = router;
