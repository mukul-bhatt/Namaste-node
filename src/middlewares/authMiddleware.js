const adminAuth = (req, res, next) => {
    console.log("/admin was called");
    const token = "alpha";
    const isAuthorised = token === "alpha";

    if(!isAuthorised) {
        return res.status(401).send("Unauthorised");
    }

    next();
}

module.exports = {
    adminAuth,
}