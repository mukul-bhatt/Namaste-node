const express = require("express");
const {adminAuth}  = require("./middlewares/authMiddleware");

// console.log(adminAuth)

const app = express();
const port = 3000;


app.get("/admin/getAllUsers", adminAuth, (req, res) => {
    console.log("All Users were successfully fetched");
    res.send("All users fetched");
})


app.delete("/admin/deleteUser", adminAuth, (req, res) => {
    res.send("User deleted successfully");
})

app.listen(port, () => {
    console.log("Server successfully listening on port 3000");
});
