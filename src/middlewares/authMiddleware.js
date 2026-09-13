const jwt = require("jsonwebtoken");
const { userModel } = require("../models/user");

const secretKey = "Dev_mukul#12390";

const userAuth = async (req, res, next) =>{

    try{

    const cookies = req.cookies;
    // console.log("USER AUTH COOKIES", cookies);
    const {token} = cookies;
    const {id} = jwt.verify(token, secretKey);
    
    const user = await userModel.findById(id);

    if(!user){
        throw new Error("User Not Found");
    }

    // If user exists, attach it to the request object, so other handlers can use it
    req.user = user;
    next();

    }catch(err){
        res.status(401).send("ERROR : " + err.message);
    }
}




module.exports = {
    userAuth,
    secretKey
}