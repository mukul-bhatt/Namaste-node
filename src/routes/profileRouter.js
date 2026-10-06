const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewares/authMiddleware");
const { userModel } = require("../models/user");
const { validateUpdateData } = require("../utils/validation");



// Get user profile
router.get("/profile", userAuth, async (req, res) => {

    try{
        res.send(req.user);
    }catch(err){
        res.status(400).send("ERROR : " + err.message);
    }

})


router.patch("/profile/edit", userAuth, async (req, res) => {
    // const user = req.user;
    // console.log("user", user);
    const userId = req.user.id;
    console.log(userId);

    try {
        // First we will validate the req body that we are receiving
        validateUpdateData(req.body);

        // If everything is valid, let's update the data
        const updatedUser =  await userModel.findByIdAndUpdate(userId, req.body, {
            returnDocument: "after",
            runValidators: true
        })

        // If the user was not found in the database, send status 400
        if(!updatedUser) {
            res.status(400).send("Could not find user");
        }

        // Send the response back, if updated successfully
        res.send({
            msg: "User was successfully updated",
            data: updatedUser
        });

    } catch (error) {
        console.log(error);
        res.status(400).send({
            error: error.message
        });
    }
   
})

router.post("/sendForgotPasswordOtp", async (req, res) => {
    const { emailId } = req.body;

    // Check if this is a valid email address in the database
    const result = await userModel.exists({
        emailId: emailId
    })

    

    // If user exists, send them a otp that is valid for 5 minutes
    
    res.send("Result");

})

router.patch("/forgotPassword", async (req, res) => {
    const { otp, newPassword, confirmPassword } = req.body;

    // Check if otp is the valid otp for this user
})

module.exports = router;