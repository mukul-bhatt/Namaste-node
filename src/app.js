const express = require("express");


const app = express();
const port = 3000;

app.use("/admin", (req, res, next) => {
    // Check if admin is authorised

    console.log("/admin was called");
    const token = "alphasss";
    const isAuthorised = token === "alpha";

    if(!isAuthorised) {
        return res.status(401).send("Unauthorised");
    }

    next();
})


app.get("/admin/getAllUsers", (req, res) => {
    console.log("All Users were successfully fetched");
    res.send("All users fetched");
})


app.delete("/admin/deleteUser", (req, res) => {
    res.send("User deleted successfully");
})

app.listen(port, () => {
    console.log("Server successfully listening on port 3000");
});
