const express = require("express");
const {connectDB} = require("./config/database");
const { userModel } = require("./models/user");
const { validateSignUpData, validateUpdateData } = require("./utils/validation");
const bcrypt = require('bcrypt');


// console.log("validator", validator);

const app = express();
const port = 3000;

app.use(express.json());

app.post("/signup", async (req, res) => {

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

app.post("/login",  async (req, res) => {

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
        res.send({
            msg: "Login successful",
            data: {
                firstName: user.firstName,
                lastName: user.lastName
            },
        })
    }else{
        res.status(400).send("Invalid Credentials")
    }

    }catch(err){
        res.status(400).send("ERROR : " + err.message);
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


// update a user
app.patch("/user", async(req, res, next) => {
    const userId = req.body.userId;

    try {

        validateUpdateData(req.body);

        const result = await userModel.findByIdAndUpdate(userId, req.body,
            {
                returnDocument: 'after',
                runValidators: true
            }
        );

        if (!result) {
            return res.status(404).send("Could not find user with userId " + userId);
        }

        console.log(result);
        res.send({
            result: "User data was updated",
            data: result
    });

    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
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



