const express = require("express");
const {connectDB} = require("./config/database");

const app = express();
const port = 3000;


connectDB().then(()=>{
    console.log("Database connection established successfully");
    app.listen(port, () => {
    console.log("Server successfully listening on port 3000");
});
}).catch((err) => {
    console.error("The error is: ", err);
})



