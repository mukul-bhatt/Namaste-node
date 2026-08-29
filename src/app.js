const express = require("express");
const {connectDB} = require("./config/database");
const { userModel } = require("./models/user");

const app = express();
const port = 3000;

app.post("/signup", async (req, res) => {
    const user = {
        firstName: "Mukul",
        lastName: "Bhatt",
        emailId: "mukul@gmail.com",
        password: "fdsafaf"
    }

    const newUser = new userModel(user);

    try{
        await newUser.save();
        res.send("User created successfully");
    }catch(err){
        res.status(500).send("Something went wrong");
        console.error(err.message);
    }

    
})


connectDB().then(()=>{
    console.log("Database connection established successfully");
    app.listen(port, () => {
    console.log("Server successfully listening on port 3000");
});
}).catch((err) => {
    console.error("The error is: ", err);
})



