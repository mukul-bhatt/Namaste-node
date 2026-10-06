const express = require("express");
const {connectDB} = require("./config/database");
const { userModel } = require("./models/user");
const { validateUpdateData } = require("./utils/validation");
const cookieParser = require('cookie-parser');
const { userAuth } = require("./middlewares/authMiddleware")
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profileRouter");

// console.log("validator", validator);

const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser());

app.use(authRouter);
app.use(profileRouter);



// Find by email and delete
app.delete("/deleteUser", async(req, res) => {

    const emailAddress = req.body.emailId;

    try{
        const result = await userModel.deleteOne({
            emailId: emailAddress
        });

        if( result.deletedCount === 0 ){
            res.status(400).send(`Could not find user with emailId: ${emailAddress}`);
        }else{
            console.log(result.deletedCount);
            res.send("User deleted successfully");
        }
    }catch(err){
        console.error(err);
        res.status(400).send("Something went wrong");
    }
})


// Find by id and delete
app.delete("/deleteUserById", async(req, res) => {
    const userId = req.body.userId;

    try {
        const result = await userModel.findByIdAndDelete(userId);
        if (result) {
            res.send("User deleted successfully", result);
        }else{
            res.status(404).send("Could not find user with userId " + userId);
        }
    } catch (error) {
        console.error(error);
        res.status(400).send("Something went wrong");
    }

})


app.get("/find", async (req, res) => {

    const emailAddress = req.query.email;
    try{
        const users = await userModel.find({
                            emailId: emailAddress
                            });

        if (users.length === 0){
            res.status(404).send("User not found");
        }else{
            res.send(users); 
        }

        
    }catch(err){
        console.error(err.message);
        res.status(400).send("Something went wrong");
    }
    
})


// Feed api - get all users

app.get("/feed", async (req, res) => {
    try{
        const allUsers = await userModel.find({});
        res.send(allUsers);
    }catch(err){
        console.error(err);
        res.status(400).send("Something went wrong");
    }


})


app.use("/", (err, req, res, next) => {
    console.error(err);
    res.status(500).send("Something went wrong");
})




connectDB().then(()=>{
    console.log("Database connection established successfully");
    app.listen(port, () => {
    console.log("Server successfully listening on port 3000");
});
}).catch((err) => {
    console.error("The error is: ", err);
})



