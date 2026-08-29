const adminAuth = (req, res, next) => {
    console.log("/admin was called");
    const token = "alphasss";
    const isAuthorised = token === "alpha";

    if(!isAuthorised) {
        return res.status(401).send("Unauthorised");
    }

    next();
}

module.exports = {
    adminAuth,
}