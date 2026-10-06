const express = require("express");
const { userModel } = require("../models/user");
const bcrypt = require('bcrypt');
const { validateSignUpData } = require("../utils/validation");
const jwt = require("jsonwebtoken");
const { secretKey } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/signup", async (req, res) => {

    try{
        // Validation of signup data
        validateSignUpData(req);

        const {firstName, lastName, emailId,  password, age, gender, about, photoUrl} = req.body;

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
            photoUrl
        });
        await newUser.save();
        res.send("User created successfully");

    }catch(err){
        console.error("Error occured in /signup api", err.message);
        res.status(400).send("ERROR: " + err.message);
    }
    
});

router.post("/login",  async (req, res) => {

    const {emailId, password} = req.body;

    // Check if it is a valid user
    try{

    const user = await userModel.findOne({emailId: emailId});

    if(!user){
        res.status(400).send("Invalid credentials");
        return;
    }

    // If it is a valid user, match the passwords
    const isValidPassword = await bcrypt.compare(password, user.password);

    if(isValidPassword){

        const token = jwt.sign({
            id: user._id
        }, secretKey, { expiresIn: "1h" });

        res.cookie("token", token);
        res.send({
            msg: "Login successful",
          
        })
    }else{
        res.status(400).send("Invalid Credentials")
    }

    }catch(err){
        res.status(400).send("ERROR : " + err.message);
    }

})  

router.post("/logout", (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now())
    });

    res.status(200).send("Logout successful");
})


module.exports = router;