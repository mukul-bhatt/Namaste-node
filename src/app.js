const express = require("express");


const app = express();
const port = 3000;

app.use("/test",(req, res) => {
     res.send("Hello World, this is mukul bhatt");
})

app.listen(port);

// console.log(app);
// console.log(typeof(app));