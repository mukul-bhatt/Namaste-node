const express = require("express");


const app = express();
const port = 3000;


app.get("/", (req, res) => {
    res.send("Namaste node.js");
})

app.post("/", (req, res) => {
    res.send("Namaste This is a post request");
})

app.delete("/", (res, req) => {
    req.send("This is a successful delete request");
})

app.patch("/", (req, res) => {
    res.send("This is a pathch request");
})

app.put("/", (req, res) => {
    res.send("THis is a pUT request");
})

app.head("/", (req, res) => {
    res.send("This is a HEAD Request");
})

app.listen(port, () => {
    console.log("Server successfully listening on port 3000");
});

// console.log(app);
// console.log(typeof(app));