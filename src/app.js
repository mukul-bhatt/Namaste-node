const express = require("express");


const app = express();
const port = 3000;


app.get("/user/:id", (req, res) => {
    console.log("params", req.params);
    console.log("queryParams", req.query);
    res.send("Namaste node.js");
})

app.get("/abc", (req, res) => {
    res.send("Namaste node.js");
})

app.listen(port, () => {
    console.log("Server successfully listening on port 3000");
});

// console.log(app);
// console.log(typeof(app));