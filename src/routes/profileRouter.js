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



module.exports = router;