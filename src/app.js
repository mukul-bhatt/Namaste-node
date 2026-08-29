const express = require("express");


const app = express();
const port = 3000;


app.get("/admin/getAllUsers", (req, res, next) => {
    // Check if admin is authorised
    const token = "alphass";
    const isAuthorised = token === "alpha";

    if(!isAuthorised) {
        return res.status(401).send("Unauthorised");
    }

    next();
},
(req, res) => {
    console.log("All Users were successfully fetched");
    res.send("All users fetched");
})

app.listen(port, () => {
    console.log("Server successfully listening on port 3000");
});
