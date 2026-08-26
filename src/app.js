const express = require("express");


const app = express();
const port = 3000;


// app.get("/user",
//      (req, res, next) => {
//         console.log("First Route handler called");
//         res.send("1st Response Handler");
//         next();
//     },
//     (req, res, next) => {
//         console.log("Second route handler called");
//         next();
//     },
//     (req, res, next) => {
//         console.log("3rd route handler");
//         next();
//     }
// )


app.get("/user",
     [(req, res, next) => {
        console.log("First Route handler called");
        res.send("1st Response Handler");
        next();
    },
    (req, res, next) => {
        console.log("Second route handler called");
        next();
    }],
    (req, res, next) => {
        console.log("Third route handler");
        next();
    },
    (req, res) => {
        console.log("Fourth route handler");
    }
)



app.listen(port, () => {
    console.log("Server successfully listening on port 3000");
});
