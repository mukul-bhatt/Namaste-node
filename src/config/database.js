const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://mukul_bhatt:N83hm2WmPaoDX7B7@learningproject.sjutakm.mongodb.net/devTinder");
}


module.exports = {
    connectDB
}