const express = require("express");


const app = express();
const port = 3000;


app.get("/user",
     (req, res, next) => {
        console.log("First Route handler called");
       
        next();
         res.send("1st Response Handler");
    }
   
)

app.get("/user",  (req, res, next) => {
        console.log("Second route handler called");
        next();
    }
)


app.listen(port, () => {
    console.log("Server successfully listening on port 3000");
});
