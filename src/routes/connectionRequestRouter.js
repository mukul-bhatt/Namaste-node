const express = require("express");
const { userAuth } = require("../middlewares/authMiddleware");
const connectionRequestModel = require("../models/connectionRequest");
const { userModel } = require("../models/user");

const connectionRouter = express.Router();

connectionRouter.post(
  "/request/send/:status/:userId",
  userAuth,
  async (req, res) => {
    try { 
      const {id} = req.user;
    //   console.log(id);
      const fromUserId = id;
      const toUserId = req.params.userId;
      const status = req.params.status;

    
      // VALIDATE STATUS RECEIVED IN THE REQUEST   
      const allowedStatus = ["interested", "ignored"];

      if(!allowedStatus.includes(status)){
        throw new Error(`${status} is not a valid status, must be one of ${allowedStatus}`);
      }

      // CHECK IF THE USER ID RECIEVED IS A VALID USER  
      const toUser = userModel.findById(toUserId);
      if(!toUser) {
        throw new Error("User not found");
      }


      // CREATE A CONNECTION REQUEST - BUT ONLY WHEN ONE ALREADY DOES NOT EXISTS

      const existingRequest = await connectionRequestModel.exists({
        $or: [
            { fromUserId, toUserId },
            { fromUserId, toUserId, toUserId: fromUserId },
        ]
      })

      if (existingRequest) {
        throw new Error("A connection request already exists between these users");
       }

      const connectionRequest = new connectionRequestModel({
        fromUserId,
        toUserId,
        status
      });

      await connectionRequest.save();

      res.send({
        msg: "Connection Request sent Successfully"
      });
    } catch (err) {
        console.log("Error", err);
        res.status(400).send("Error: " + err.message);
    }
  },
);


module.exports = connectionRouter;