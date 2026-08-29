const express = require("express");
const {adminAuth}  = require("./middlewares/authMiddleware");

// console.log(adminAuth)

const app = express();
const port = 3000;


app.use("/admin", adminAuth);


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
