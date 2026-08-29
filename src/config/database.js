const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://mukulgautam5200:98qe4TAnx30CjcTe@learningproject.sjutakm.mongodb.net/devTinder");
}

module.exports = {
    connectDB
}